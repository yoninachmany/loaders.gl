// Forked from https://github.com/uber-web/type-analyzer under MIT license
// Copyright (c) 2017 Uber Technologies, Inc.

import test from 'tape-promise/tape';
import {Analyzer} from '@loaders.gl/type-analyzer';

import {EXAMPLE_STRING_NUMBER} from './data/fixtures/example-data';

function mapArr(d) {
  return {col: d};
}

test('Analyzer: basic functionality', assert => {
  assert.deepEqual(Analyzer.computeColMeta([]), [], 'doesnt freak out when you hand it empty data');
  assert.deepEqual(
    // @ts-ignore
    Analyzer.computeColMeta(undefined),
    [],
    'doesnt freak out when you hand it nothing'
  );

  const arr = [1, null, '3', undefined, -5].map(mapArr);
  assert.deepEqual(
    Analyzer.computeColMeta(arr)[0].type,
    'INT',
    'doesnt freak out when you hand it nulls and undefineds'
  );

  assert.end();
});

test('Analyzer: boolean validator', assert => {
  let arr = [];

  arr = [1, 0, 1, 0, 1, 0].map(mapArr);
  assert.equal(
    Analyzer.computeColMeta(arr)[0].type,
    'INT',
    'Inteprets ones and zeros as int, not booleans'
  );

  arr = ['true', 'false', 'true', 'false', 'true', 'false'].map(mapArr);
  assert.equal(
    Analyzer.computeColMeta(arr)[0].type,
    'BOOLEAN',
    'Inteprets true and false strings as booleans'
  );

  arr = ['yes', 'no', 'yes', 'no', 'yes', 'no'].map(mapArr);
  assert.equal(
    Analyzer.computeColMeta(arr)[0].type,
    'BOOLEAN',
    'Inteprets yes and no strings as booleans'
  );

  assert.end();
});

test('Analyzer: array validator', assert => {
  let arr = [];

  arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['1', 'b'], ['2', 3], ['he']].map(mapArr);
  assert.equal(
    Analyzer.computeColMeta(arr)[0].type,
    'ARRAY',
    'Should interpret as Array, if data contain js array'
  );

  assert.end();
});

test('Analyzer: object validator', assert => {
  let arr = [];

  arr = [{a: 1}, [4, 5, 6], {b: 2}, {c: 3}, {d: 4}, {d: 5}].map(mapArr);
  assert.equal(
    Analyzer.computeColMeta(arr)[0].type,
    'OBJECT',
    'Should interpret as Object, if data contain js object'
  );

  assert.end();
});

test('Analyzer: number validator', assert => {
  let arr = [];

  arr = [1, '222,222', '-333,333,333', -4, '+5,000'].map(mapArr);
  assert.equal(Analyzer.computeColMeta(arr)[0].type, 'INT', 'Inteprets values as integers');

  arr = ['-.1111', '+.2', '+3,333.3333', 444.4444, '5,555,555.5'].map(mapArr);
  assert.equal(Analyzer.computeColMeta(arr)[0].type, 'FLOAT', 'Inteprets values as floats');

  arr = [
    1,
    '222,222',
    '-333,333,333',
    -4,
    '+5,000',
    '-.1111',
    '+.2',
    '+3,333.3333',
    444.4444,
    '5,555,555.5'
  ].map(mapArr);
  assert.equal(
    Analyzer.computeColMeta(arr)[0].type,
    'FLOAT',
    'Inteprets a mix of int and float values as floats'
  );

  arr = ['$1', '$0.12', '$1.12', '$1,000.12', '$1,000.12'].map(mapArr);
  assert.equal(Analyzer.computeColMeta(arr)[0].type, 'CURRENCY', 'Inteprets values as currency');
  arr = ['$1', '$0.12', '$1.12', '$1,000.12', '$1,000.12'].map(mapArr);
  assert.equal(
    Analyzer.computeColMeta(arr, [], {ignoredDataTypes: 'CURRENCY'})[0].type,
    'STRING',
    'Inteprets values with ignoredDataType:CURRENCY as string'
  );

  arr = ['10.12345%', '-10.222%', '+1,000.33%', '10.4%', '10.55%'].map(mapArr);
  assert.equal(Analyzer.computeColMeta(arr)[0].type, 'PERCENT', 'Inteprets values as percents');

  [2.3, '+4,000', '-5,023.234', '2.3e+2', '$23,203', '23.45%'].forEach(function loopAcrossExamples(
    ex
  ) {
    arr = [ex, ex, ex, ex, ex, ex].map(mapArr);
    assert.equal(
      Analyzer.computeColMeta(arr)[0].category,
      'MEASURE',
      `Inteprets sci or money valeus, eg ${ex} formatted values as numbers`
    );
  });

  arr = EXAMPLE_STRING_NUMBER.map(mapArr);
  assert.equal(Analyzer.computeColMeta(arr)[0].type, 'NUMBER', 'Inteprets values as numbers');
  assert.end();

  arr = ['182891173641581479', '2e53', '1e16', 182891173641581479].map(mapArr);
  assert.equal(
    Analyzer.computeColMeta(arr)[0].type,
    'NUMBER',
    'Inteprets large numeric values as numbers'
  );

  arr = [
    1,
    '222,222',
    '-333,333,333',
    -4,
    '+5,000',
    '-.1111',
    '+.2',
    '+3,333.3333',
    444.4444,
    '5,555,555.5',
    '182891173641581479',
    '2e53',
    '1e16',
    182891173641581479
  ].map(mapArr);
  assert.equal(
    Analyzer.computeColMeta(arr)[0].type,
    'NUMBER',
    'Inteprets a mix of numeric values as numbers'
  );
});

test('Analyzer: string validator', assert => {
  let arr = [];

  ['Aasdaaaa', 'Bbdsabbb', 'Ccccc', 'Ddddd', 'EeeDe'].forEach(function loopAcrossExamples(ex) {
    arr = [ex, ex, ex, ex, ex, ex].map(mapArr);
    assert.equal(
      Analyzer.computeColMeta(arr)[0].type,
      'STRING',
      `Interprets ${ex} strings a string`
    );
  });

  ['San Francisco', 'New York', 'Chicago', 'Austin', 'Los Angeles'].forEach(
    function loopAcrossExamples(ex) {
      arr = [ex, ex, ex, ex, ex, ex].map(mapArr);
      assert.equal(
        Analyzer.computeColMeta(arr)[0].type,
        'STRING',
        `Interprets ${ex} strings a string`
      );
    }
  );
  [
    '13 Domestic Whole',
    '11 Domestic New',
    '13 Domestic Whole',
    '11 Domestic New',
    '21 International New'
  ].forEach(function loopAcrossExamples(ex) {
    arr = [ex, ex, ex, ex, ex, ex].map(mapArr);
    assert.equal(
      Analyzer.computeColMeta(arr)[0].type,
      'STRING',
      `Interprets ${ex} strings a string`
    );
  });

  assert.end();
});
