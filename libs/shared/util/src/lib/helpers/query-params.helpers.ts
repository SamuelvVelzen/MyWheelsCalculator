export class QueryParamsHelpers {
  static SPLITTER = ';';

  static encodeArray(value: unknown[]): string {
    return value
      .map((v) => String(v).replace(/,/g, '%2C')) // Escape commas in values
      .join(QueryParamsHelpers.SPLITTER); // Join with commas
  }

  static decodeArray(value: string | null): string[] {
    if (!value) {
      return [];
    }

    return value
      .split(QueryParamsHelpers.SPLITTER)
      .map((v) => v.replace(/%2C/g, QueryParamsHelpers.SPLITTER));
  }
}
