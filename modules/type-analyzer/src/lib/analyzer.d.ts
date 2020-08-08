// Forked from https://github.com/uber-web/type-analyzer under MIT license
// Copyright (c) 2017 Uber Technologies, Inc.

export default class Analyzer {
  /**
   * Generate metadata about columns in a dataset
   * @param data - data for which meta will be generated
   * @param analyzerRules - regexs describing column overrides
   * @param {Object.array} ignoredDataTypes - array of datatypes to ignore when validating
   * @return column metadata
   **/
  static computeColMeta(
    data: object,
    analyzerRules?: object,
    options?: object
  ): object;

  static _category(colType);
}
