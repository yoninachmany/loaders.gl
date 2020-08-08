// Forked from https://github.com/uber-web/type-analyzer under MIT license
// Copyright (c) 2017 Uber Technologies, Inc.

// These help you test
// this file is not a test suite for app utils

import tapeTest from 'tape';

const testDurations = [];

export function test(name, spec) {
  tapeTest(name, function onTest() {
    const start = Date.now();
    spec(...arguments);
    const duration = Date.now() - start;
    testDurations.push({name, duration});
  });
}

export function report() {
  testDurations.forEach(function loopAcrossDurations(t) {
    /* eslint-disable no-console, no-undef */
    console.log(`Test "${t.name}" took ${t.duration} ms`);
    /* eslint-enable no-console, no-undef */
  });
}
