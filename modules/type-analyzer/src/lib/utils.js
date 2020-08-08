// Forked from https://github.com/uber-web/type-analyzer under MIT license
// Copyright (c) 2017 Uber Technologies, Inc.

import * as CONSTANT from './constant';
import * as TimeRegex from './time-regex';
// Note: This code is deciding which static export will be used during runtime
/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as RegexList from './regex-list';

/**
 * Generate a function to discover which time format a value is
 * @param {RegExp} formatRegex - the filter to be checked and processed
 * @param {Object} regexMap - Map between regex and associated format
 * @return {Function} to the format checker
 */
function whichFormatGenerator(formatRegex, regexMap) {
  return function whichFormat(value) {
    if (formatRegex.test(value)) {
      const regexes = Object.keys(regexMap);
      for (let i = 0; i < regexes.length; i++) {
        const regex = regexes[i];
        const format = regexMap[regex];
        const newRegex = new RegExp(regex);
        if (newRegex.test(value)) {
          return format;
        }
      }
    }
    return false;
  };
}

export const whichFormatTime = whichFormatGenerator(
  TimeRegex.ALL_TIME_FORMAT_REGEX,
  TimeRegex.TIME_FORMAT_REGEX_MAP
);
export const whichFormatDate = whichFormatGenerator(
  TimeRegex.DATE_FORMAT_REGEX,
  TimeRegex.DATE_FORMAT_REGEX_MAP
);
export const whichFormatDateTime = whichFormatGenerator(
  TimeRegex.ALL_DATE_TIME_REGEX,
  TimeRegex.DATE_TIME_MAP
);

export function buildRegexCheck(regexId) {
  return function check(value) {
    return RegexList[regexId].test(value.toString());
  };
}

export function detectTimeFormat(value, type) {
  switch (type) {
    case CONSTANT.DATA_TYPES.DATETIME:
      return whichFormatDateTime(value);
    case CONSTANT.DATA_TYPES.DATE:
    default:
      return whichFormatDate(value);
    case CONSTANT.DATA_TYPES.TIME:
      return whichFormatTime(value);
  }
}

export function findFirstNonNullValue(data, column) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][column] !== null && data[i][column] !== CONSTANT.NULL) {
      return data[i][column];
    }
  }
  return null;
}

export function isBoolean(value) {
  return (
    CONSTANT.BOOLEAN_TRUE_VALUES.concat(CONSTANT.BOOLEAN_FALSE_VALUES).indexOf(
      String(value).toLowerCase()
    ) > -1
  );
}

export function isGeographic(value) {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    value.hasOwnProperty('type') &&
    value.hasOwnProperty('coordinates')
  );
}

// string types
export function isString(value) {
  return typeof value === 'string';
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(value) {
  return value === Object(value) && typeof value !== 'function' && !Array.isArray(value);
}
