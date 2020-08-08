// Forked from https://github.com/uber-web/type-analyzer under MIT license
// Copyright (c) 2017 Uber Technologies, Inc.

export const NULL = 'NULL';
export const BOOLEAN_TRUE_VALUES = ['true', 'yes'];
export const BOOLEAN_FALSE_VALUES = ['false', 'no'];

export const CATEGORIES = {
  GEOMETRY: 'GEOMETRY',
  TIME: 'TIME',
  DIMENSION: 'DIMENSION',
  MEASURE: 'MEASURE'
};

export const DATA_TYPES = {
  // date time formats
  DATE: 'DATE',
  TIME: 'TIME',
  DATETIME: 'DATETIME',

  // number formats
  NUMBER: 'NUMBER',
  INT: 'INT',
  FLOAT: 'FLOAT',
  CURRENCY: 'CURRENCY',
  PERCENT: 'PERCENT',

  // string types:
  STRING: 'STRING',
  ZIPCODE: 'ZIPCODE',

  // boolean type
  BOOLEAN: 'BOOLEAN',

  // geometry
  GEOMETRY: 'GEOMETRY',
  GEOMETRY_FROM_STRING: 'GEOMETRY_FROM_STRING',
  PAIR_GEOMETRY_FROM_STRING: 'PAIR_GEOMETRY_FROM_STRING',

  // object format
  NONE: 'NONE',
  ARRAY: 'ARRAY',
  OBJECT: 'OBJECT'
};

export const POSSIBLE_TYPES = {
  [CATEGORIES.GEOMETRY]: [
    DATA_TYPES.GEOMETRY_FROM_STRING,
    DATA_TYPES.PAIR_GEOMETRY_FROM_STRING,
    DATA_TYPES.GEOMETRY
  ],

  [CATEGORIES.TIME]: [DATA_TYPES.DATETIME, DATA_TYPES.DATE, DATA_TYPES.TIME],

  [CATEGORIES.DIMENSION]: [DATA_TYPES.STRING, DATA_TYPES.BOOLEAN, DATA_TYPES.ZIPCODE],

  [CATEGORIES.MEASURE]: [
    DATA_TYPES.NUMBER,
    DATA_TYPES.INT,
    DATA_TYPES.FLOAT,
    DATA_TYPES.CURRENCY,
    DATA_TYPES.PERCENT
  ]
};

export const TYPES_TO_CATEGORIES = Object.keys(POSSIBLE_TYPES).reduce(
  function generateTypeToCategoryMap(res, category) {
    POSSIBLE_TYPES[category].forEach(function loopAcrossTypes(type) {
      res[type] = category;
    });
    return res;
  },
  {}
);

// NOTE: the order of validator is important.
// the ancestor validator used to be the subset of next validator
// here's trying to determine a more accuraet data type of the column.
// later on, users still can override the data type.
// this will affect how we trasnform(aggregation), formating the data.
export const VALIDATORS = [
  // geometry
  DATA_TYPES.GEOMETRY,
  DATA_TYPES.GEOMETRY_FROM_STRING,
  DATA_TYPES.PAIR_GEOMETRY_FROM_STRING,

  // true/false, 0/1
  DATA_TYPES.BOOLEAN,
  DATA_TYPES.ARRAY,
  DATA_TYPES.OBJECT,

  // prefix/postfix rules
  DATA_TYPES.CURRENCY,
  DATA_TYPES.PERCENT,

  // times
  DATA_TYPES.DATETIME,
  DATA_TYPES.DATE,
  DATA_TYPES.TIME,

  // numbers
  DATA_TYPES.INT,
  DATA_TYPES.FLOAT,
  DATA_TYPES.NUMBER,

  // strings
  DATA_TYPES.ZIPCODE,
  DATA_TYPES.STRING
];

export const TIME_VALIDATORS = [DATA_TYPES.DATETIME, DATA_TYPES.DATE, DATA_TYPES.TIME];
