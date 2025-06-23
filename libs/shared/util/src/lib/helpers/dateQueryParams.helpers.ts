import { isSameYear } from 'date-fns';

export class DateQueryParamsHelpers {
  static sameYear(date1: Date, date2: Date): boolean {
    return isSameYear(date1, date2);
  }
  // Encode: Date -> "010124-1000" (DDMMYY-HHMM)
  static encodeDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}${month}${year}-${hours}${minutes}`;
  }

  static decodeDate(dateString: string): Date | null {
    const match = dateString.match(/^(\d{2})(\d{2})(\d{2})-(\d{2})(\d{2})$/);
    if (match) {
      const [, day, month, year, hours, minutes] = match;
      const fullYear = 2000 + parseInt(year);
      return new Date(
        fullYear,
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );
    }

    return null;
  }
}
