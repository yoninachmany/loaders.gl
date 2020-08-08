// Forked from https://github.com/uber-web/type-analyzer under MIT license
// Copyright (c) 2017 Uber Technologies, Inc.

import * as CONSTANT from './constant';
import VALIDATOR_MAP from './validator-map';
import {findFirstNonNullValue, detectTimeFormat} from './utils';

const NUMBER_OF_ALLOWED_HITS = 3;

const Analyzer = {};

Analyzer._category = function _category(colType) {
  return CONSTANT.TYPES_TO_CATEGORIES[colType] || CONSTANT.CATEGORIES.DIMENSION;
};

const VALIDATOR_CONSIDERS_EMPTY_STRING_NULL = {
  PAIR_GEOMETRY_FROM_STRING: true,
  GEOMETRY_FROM_STRING: true,
  NUMBER: true
};

/**
 * Check if a given value is a null for a validator
 * @param {String} value - value to be checked if null
 * @param {String} validatorName - the name of the current validation function
 * @return {Boolean} whether or not the current value is null
 **/
function valueIsNullForValidator(value, validatorName) {
  if (value === null || value === CONSTANT.NULL || typeof value === 'undefined') {
    return true;
  }

  if (value === '' && VALIDATOR_CONSIDERS_EMPTY_STRING_NULL[validatorName]) {
    return true;
  }

  return false;
}

function buildValidatorFinder(data, columnName) {
  return function findTypeFromValidators(validatorName) {
    // you get three strikes until we dont think you are this type
    const nonNullData = data.filter(function iterator(row) {
      const value = row[columnName];
      return !valueIsNullForValidator(value, validatorName);
    });

    const validator = VALIDATOR_MAP[validatorName];

    let strikes = Math.min(NUMBER_OF_ALLOWED_HITS, nonNullData.length);
    let hits = 0;
    nonNullData.some(function iterateAcrossData(row) {
      const isValueValid = Boolean(validator(row[columnName]));
      if (isValueValid) {
        hits++;
      } else {
        strikes--;
      }

      if (strikes <= 0) {
        return true;
      }
      return false;
    });

    return strikes > 0 && hits > 0;
  };
}

function getTypeFromRules(analyzerRules, columnName) {
  return (analyzerRules || []).reduce(function checkClmns(newType, rule) {
    if (newType) {
      return newType;
    }
    if (rule.name && rule.name === columnName) {
      return rule.dataType;
    }
    if (rule.regex && rule.regex.test(columnName)) {
      return rule.dataType;
    }
    return newType;
  }, false);
}

/**
 * Generate metadata about columns in a dataset
 */
Analyzer.computeColMeta = function computeColMeta(data, analyzerRules, options) {
  const ignoredDataTypes = (options || {}).ignoredDataTypes || [];
  const allValidators = CONSTANT.VALIDATORS.filter(function filterValidators(validator) {
    // @ts-ignore TODO
    return this.indexOf(validator) < 0;
  }, ignoredDataTypes);

  if (!data || Object.keys(data).length === 0) {
    return [];
  }

  const _columns = Object.keys(data[0]);
  /* eslint-disable max-statements, complexity */
  return _columns.reduce(function iterator(res, columnName) {
    let format = '';
    // First try to get the column from the rules
    let type = getTypeFromRules(analyzerRules, columnName);
    // ff it's not there then try to infer the type
    if (!type) {
      type = allValidators.find(buildValidatorFinder(data, columnName));
    }
    // if theres still no type, dump this column
    const category = Analyzer._category(type);
    if (!type) {
      return res;
    }
    // if its a time, detect and record the time
    if (type && CONSTANT.TIME_VALIDATORS.indexOf(type) !== -1) {
      // Find the first non-null value.
      const sample = findFirstNonNullValue(data, columnName);
      if (sample === null) {
        return res;
      }
      format = detectTimeFormat(sample, type);
    }

    const colMeta = {
      key: columnName,
      label: columnName,
      type,
      category,
      format
    };

    if (type === CONSTANT.DATA_TYPES.GEOMETRY) {
      const geoSample = findFirstNonNullValue(data, columnName);
      if (geoSample === null) {
        return res;
      }
      colMeta.geoType = typeof geoSample.type === 'string' ? geoSample.type.toUpperCase() : null;
    }
    if (type === CONSTANT.DATA_TYPES.GEOMETRY_FROM_STRING) {
      const geoStringSample = findFirstNonNullValue(data, columnName);
      if (geoStringSample === null) {
        return res;
      }
      colMeta.geoType = geoStringSample.split(' ')[0].toUpperCase();
    }
    if (type === CONSTANT.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING) {
      colMeta.geoType = 'POINT';
    }
    // @ts-ignore
    res.push(colMeta);
    return res;
  }, []);
};
/* eslint-enable max-statements */

export default Analyzer;
