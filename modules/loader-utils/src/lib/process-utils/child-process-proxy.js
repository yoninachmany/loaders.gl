// Forked from probe.gl under MIT license, Copyright (c) 2015 - 2017 Uber Technologies, Inc.

/* eslint-disable no-console */
/* global setTimeout, clearTimeout, console */
import ChildProcess from 'child_process';
import assert from '../env-utils/assert';

const DEFAULT_PROCESS_OPTIONS = {
  command: null,
  arguments: [],
  wait: 2000,
  debug: false,
  nodeSpawnOptions: {maxBuffer: 5000 * 1024},
  onSuccess: processProxy => {
    console.log(`Started ${processProxy.options.command}`);
  }
};

export default class ChildProcessProxy {
  static isSupported() {
    return Boolean(ChildProcess && ChildProcess.spawn);
  }

  constructor() {
    this.childProcess = null;
  }

  async start(options = {}) {
    options = {...DEFAULT_PROCESS_OPTIONS, ...options};
    assert(options.command && typeof options.command === 'string');
    this.options = options;

    const args = [...options.arguments];

    return await new Promise((resolve, reject) => {
      try {
        const successTimer = setTimeout(() => {
          if (options.onSuccess) {
            options.onSuccess(this);
          }
          resolve({});
        }, options.wait);

        if (options.debug) {
          console.log(`Spawning ${options.command} ${options.arguments.join(' ')}`);
        }
        this.childProcess = ChildProcess.spawn(options.command, args, options.spawn);

        // TODO - add option regarding whether stderr should be treated as data
        this.childProcess.stderr.on('data', data => {
          if (options.debug) {
            console.log(`Child process wrote to stderr: "${data}".`);
          }
          clearTimeout(successTimer);
          reject(new Error(data));
        });
        this.childProcess.on('error', error => {
          if (options.debug) {
            console.log(`Child process errored with ${error}`);
          }
          clearTimeout(successTimer);
          reject(error);
        });
        this.childProcess.on('close', code => {
          if (options.debug) {
            console.log(`Child process exited with ${code}`);
          }
          this.childProcess = null;
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async stop() {
    if (this.childProcess) {
      this.childProcess.kill();
      this.childProcess = null;
    }
  }
}
