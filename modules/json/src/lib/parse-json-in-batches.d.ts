export default function parseJSONInBatches(asyncIterator, options);

/**
 * Reconstruct a complete JSON object from a streamed array and a top-level object
 * @param lastBatch The last batch (type === 'final-result')
 * @param data array of streamed data
 */
export function rebuildJsonObject(lastBatch: object, data: any[]): object | any[];
