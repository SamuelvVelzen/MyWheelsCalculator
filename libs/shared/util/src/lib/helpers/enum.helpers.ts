import { Helpers } from './helpers';

export class EnumHelpers {
  static parseEnum<T>(value: string | null, enumValues: T[]): T | null {
    if (!value) {
      return null;
    }

    return enumValues.includes(value as T) ? (value as T) : null;
  }

  static parseEnumFromObject<T extends Record<string, string | number>>(
    value: string | null,
    enumObject: T
  ): T[keyof T] | null {
    if (!value) {
      return null;
    }

    const enumValues = Object.values(enumObject);
    return enumValues.includes(value as T[keyof T])
      ? (value as T[keyof T])
      : null;
  }

  static parseEnumsFromObject<T extends Record<string, string | number>>(
    values: string[] | null,
    enumObject: T
  ): T[keyof T][] | null {
    if (!values) {
      return null;
    }

    return values
      .map((v) => EnumHelpers.parseEnumFromObject(v, enumObject))
      .filter(Helpers.isNotNullOrUndefined);
  }
}
