import { isAfter, isBefore } from 'date-fns';

export class DateHelpers {
  static isAfter(date1: string, date2: string): boolean {
    return isAfter(new Date(date1), new Date(date2));
  }

  static isBefore(date1: string, date2: string): boolean {
    return isBefore(new Date(date1), new Date(date2));
  }
}
