import ChildProcess from 'child_process';

export type ProcessProxyOptions = {
  /** Command to execute */
  command: string;
  /** Arguments to the command */
  arguments: string[],
  /** If true emits helpful logging tracing the child process lifecycle */
  debug?: boolean,
  /** Number of milliseconds to wait until concluding success */
  waitMs?: number,
  /** Options passed on to Node'.js `ChildProcess.spawn` */
  spawn?: ChildProcess.SpawnOptionsWithoutStdio,
  /** Callback when the process has started */
  onStart?: (proxy: ChildProcessProxy) => void
};

/** 
 * Manager for spawning, waiting for and terminating child process
 * Prepares arguments, starts, stops and tracks output
 * Only supported under Node.js 
 */
export default class ChildProcessProxy {
  /** Whether ChildProcessProxy is supported on the current platform */
  static isSupported(): boolean;

  /** Create a new ChildProcessProxy instance */
  constructor();

  /** Starts a child process with the provided options */
  start(options?: ProcessProxyOptions): Promise<object>;

  /** Stops a running child process */
  stop(): Promise<void>
}
