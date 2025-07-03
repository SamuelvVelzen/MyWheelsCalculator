export class Helpers {
  static castFn = <T>(value: unknown) => value as T;

  static isNotNullOrUndefined = <T>(value: T | null | undefined): value is T =>
    value !== null && value !== undefined;
}
