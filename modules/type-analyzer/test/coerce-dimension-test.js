// Forked from https://github.com/uber-web/type-analyzer under MIT license
// Copyright (c) 2017 Uber Technologies, Inc.

import test from 'tape-promise/tape';
import {Analyzer} from '@loaders.gl/type-analyzer';

test('Analyzer: force dimension via rules', assert => {
  let arr = [];
  const mapArr = function mapArr(d) {
    return {col: d, batmang: d + 1};
  };

  arr = [1, 0, 1, 0, 1, 0].map(mapArr);
  let ruleSet = [{regex: /col/, dataType: 'STRING'}];
  let colMeta = Analyzer.computeColMeta(arr, ruleSet);
  assert.equal(colMeta[0].type, 'STRING', 'correctly forces data to be read as strings');
  assert.equal(
    colMeta[1].type,
    'INT',
    'leaves the non matching column alone and analyzes as normal'
  );

  ruleSet = [{regex: /col/, dataType: 'NUMBER'}];
  colMeta = Analyzer.computeColMeta(arr, ruleSet);
  assert.equal(colMeta[0].type, 'NUMBER', 'correctly forces data to be read as numbers');
  assert.equal(
    colMeta[1].type,
    'INT',
    'leaves the non matching column alone and analyzes as normal'
  );

  ruleSet = [{regex: /col/, dataType: 'BOOLEAN'}];
  colMeta = Analyzer.computeColMeta(arr, ruleSet);
  assert.equal(colMeta[0].type, 'BOOLEAN', 'correctly forces data to be read as booleans');
  assert.equal(
    colMeta[1].type,
    'INT',
    'leaves the non matching column alone and analyzes as normal'
  );

  assert.end();
});

test('Analyzer: force dimension via rules - string match', assert => {
  let arr = [];
  const mapArr = function mapArr(d) {
    return {col: d, batmang: d + 1};
  };

  arr = [1, 0, 1, 0, 1, 0].map(mapArr);
  let ruleSet = [{name: 'col', dataType: 'STRING'}];
  let colMeta = Analyzer.computeColMeta(arr, ruleSet);
  assert.equal(colMeta[0].type, 'STRING', 'correctly forces data to be read as strings');
  assert.equal(
    colMeta[1].type,
    'INT',
    'leaves the non matching column alone and analyzes as normal'
  );

  ruleSet = [{name: 'col', dataType: 'NUMBER'}];
  colMeta = Analyzer.computeColMeta(arr, ruleSet);
  assert.equal(colMeta[0].type, 'NUMBER', 'correctly forces data to be read as numbers');
  assert.equal(
    colMeta[1].type,
    'INT',
    'leaves the non matching column alone and analyzes as normal'
  );

  ruleSet = [{name: 'col', dataType: 'BOOLEAN'}];
  colMeta = Analyzer.computeColMeta(arr, ruleSet);
  assert.equal(colMeta[0].type, 'BOOLEAN', 'correctly forces data to be read as booleans');
  assert.equal(
    colMeta[1].type,
    'INT',
    'leaves the non matching column alone and analyzes as normal'
  );

  assert.end();
});

test('Analyzer: passing invalid rules', assert => {
  let arr = [];
  const mapArr = function mapArr(d) {
    return {col: d, batmang: d + 1};
  };

  arr = [1, 0, 1, 0, 1, 0].map(mapArr);
  const ruleSet = [{key: 'col', dataType: 'STRING'}];
  const colMeta = Analyzer.computeColMeta(arr, ruleSet);
  assert.equal(colMeta[1].type, 'INT', 'Ignores the invalid rules and analyzes as normal');

  assert.end();
});
