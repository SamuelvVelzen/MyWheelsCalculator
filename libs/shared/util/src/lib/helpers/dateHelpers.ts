import { isAfter, isBefore } from 'date-fns';

export class DateHelpers {
  static isAfter(date1: string | Date, date2: string | Date): boolean {
    if (typeof date1 === 'string') {
      date1 = new Date(date1);
    }

    if (typeof date2 === 'string') {
      date2 = new Date(date2);
    }

    return isAfter(date1, date2);
  }

  static isBefore(date1: string | Date, date2: string | Date): boolean {
    if (typeof date1 === 'string') {
      date1 = new Date(date1);
    }

    if (typeof date2 === 'string') {
      date2 = new Date(date2);
    }

    return isBefore(date1, date2);
  }
}
