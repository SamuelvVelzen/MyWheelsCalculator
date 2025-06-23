export class QueryParamsHelpers {
  static encodeArray(value: unknown[]): string {
    return value
      .map((v) => String(v).replace(/,/g, '%2C')) // Escape commas in values
      .join(','); // Join with commas
  }

  static decodeArray(value: string | null): string[] {
    if (!value) {
      return [];
    }

    return value.split(',').map((v) => v.replace(/%2C/g, ','));
  }
}
