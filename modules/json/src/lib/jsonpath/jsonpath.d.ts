
/**
 * A parser for a minimal subset of the jsonpath standard
 * Full JSON path parsers for JS exist but are quite large (bundle size)
 *
 * Supports
 *
 *   `$.component.component.component`
 */
export default class JSONPath {
  constructor(path: JSONPath | string | null);

  clone(): JSONPath;

  toString(): string;

  push(name: string): void;

  pop(): string;
  set(name: string): void;

  equals(other: JSONPath): boolean;

  /**
   * Sets the value pointed at by path
   * TODO - handle root path
   */
  setFieldAtPath(object: object, value: any): void;

  /**
   * Gets the value pointed at by path
   * TODO - handle root path
   */
  getFieldAtPath(object: object): any;
}
