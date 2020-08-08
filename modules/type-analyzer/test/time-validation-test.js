// Forked from https://github.com/uber-web/type-analyzer under MIT license
// Copyright (c) 2017 Uber Technologies, Inc.

import test from 'tape-promise/tape';
import {whichFormatDate, whichFormatDateTime} from '@loaders.gl/type-analyzer/lib/utils';

test('#whichFormatDate', assert => {
  assert.equals(whichFormatDate('2015-1-1'), 'YYYY-M-D');
  assert.equals(whichFormatDate('2012-1-10'), 'YYYY-M-D');
  assert.equals(whichFormatDate('1/10/2012'), 'M/D/YYYY');
  assert.equals(whichFormatDate('January 02, 2012'), 'MMMM DD, YYYY');
  assert.equals(whichFormatDate('Jan 02, 2012'), 'MMM DD, YYYY');
  assert.equals(whichFormatDate('January 3rd, 2012'), 'MMMM Do, YYYY');
  assert.equals(whichFormatDate('Jan 2nd, 2012'), 'MMM Do, YYYY');
  assert.equals(whichFormatDate('Jan 22nd, 2012'), 'MMM Do, YYYY');
  assert.end();
});

test('#whichFormatDateTime', assert => {
  assert.equals(whichFormatDateTime('1967/07/19 20:49:08.07'), 'YYYY/M/D HH:mm:ss.SSSS');
  assert.end();
});
