import {assert, makeTextDecoderIterator} from '@loaders.gl/loader-utils';
import {TableBatchBuilder} from '@loaders.gl/tables';
import StreamingJSONParser from './parser/streaming-json-parser';
import JSONPath from './jsonpath/jsonpath';

// TODO - support batch size 0 = no batching/single batch?
// eslint-disable-next-line max-statements, complexity
export default async function* parseJSONInBatches(asyncIterator, options) {
  asyncIterator = makeTextDecoderIterator(asyncIterator);

  const {metadata} = options;
  const {batchSize, _rootObjectBatches, jsonpaths} = options.json;
  const TableBatchType = options.json.TableBatch;

  let isFirstChunk = true;
  let tableBatchBuilder = null;
  let schema = null;

  const parser = new StreamingJSONParser({jsonpaths});
  tableBatchBuilder =
    // @ts-ignore
    tableBatchBuilder || new TableBatchBuilder(TableBatchType, schema, {batchSize});

  for await (const chunk of asyncIterator) {
    const rows = parser.write(chunk);

    const jsonpath = rows.length > 0 && parser.getStreamingJsonPathAsString();

    if (rows.length > 0 && isFirstChunk) {
      if (metadata) {
        const initialBatch = {
          batchType: 'partial-result',
          container: parser.getPartialResult(),
          data: [],
          bytesUsed: 0,
          schema: null,
          jsonpath
        };
        yield initialBatch;
      }
      // Backwards compabitility
      if (_rootObjectBatches) {
        const initialBatch = {
          batchType: 'root-object-batch-partial',
          container: parser.getPartialResult(),
          data: [],
          schema: null
        };
        yield initialBatch;
      }
      isFirstChunk = false;
      schema = deduceSchema(rows);
    }

    // Add the row
    for (const row of rows) {
      tableBatchBuilder.addRow(row);
      // If a batch has been completed, emit it
      if (tableBatchBuilder.isFull()) {
        yield tableBatchBuilder.getBatch({jsonpath});
      }
    }

    tableBatchBuilder.chunkComplete(chunk);
    if (tableBatchBuilder.isFull()) {
      yield tableBatchBuilder.getBatch({jsonpath});
    }
  }

  // yield final batch
  const jsonpath = parser.getStreamingJsonPathAsString();
  const batch = tableBatchBuilder.getBatch({jsonpath});
  if (batch) {
    yield batch;
  }

  if (metadata) {
    const finalBatch = {
      batchType: 'final-result',
      container: parser.getPartialResult(),
      jsonpath: parser.getStreamingJsonPathAsString(),
      data: [],
      schema: null
    };
    yield finalBatch;
  }
  if (_rootObjectBatches) {
    const finalBatch = {
      batchType: 'root-object-batch-complete',
      container: parser.getPartialResult(),
      data: [],
      schema: null
    };
    yield finalBatch;
  }
}

function deduceSchema(rows) {
  const row = rows[0];

  const schema = {};
  let i = 0;
  for (const columnName in row) {
    const value = row[columnName];
    switch (typeof value) {
      case 'number':
      case 'boolean':
        // TODO - booleans could be handled differently...
        schema[columnName] = {name: String(columnName), index: i, type: Float32Array};
        break;

      case 'object':
        schema[columnName] = {name: String(columnName), index: i, type: Array};
        break;

      case 'string':
      default:
        schema[columnName] = {name: String(columnName), index: i, type: Array};
      // We currently only handle numeric rows
      // TODO we could offer a function to map strings to numbers?
    }
    i++;
  }
  return schema;
}

export function rebuildJsonObject(batch, data) {
  // Last batch will have this special type and will provide all the root object of the parsed file
  assert(batch.batchType === 'final-result');

  // The streamed JSON data is a top level array (jsonpath = '$'), just return the array of row objects
  if (batch.jsonpath === '$') {
    return data;
  }

  // (jsonpath !== '$') The streamed data is not a top level array, so stitch it back in to the top-level object
  if (batch.jsonpath && batch.jsonpath.length > 1) {
    const topLevelObject = batch.container;
    const streamingPath = new JSONPath(batch.jsonpath);
    streamingPath.setFieldAtPath(topLevelObject, data);
    return topLevelObject;
  }

  // No jsonpath, in this case nothing was streamed.
  return batch.container;
}
