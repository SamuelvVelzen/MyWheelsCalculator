import {
  addHours,
  isAfter,
  isBefore,
  isSameDay,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns';

export class DateHelpers {
  static isAfter(
    date1: string | Date | null | undefined,
    date2: string | Date | null | undefined
  ): boolean {
    if (!date1 || !date2) {
      return true;
    }
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

  static roundToNearestStep(date: Date, step: number): Date {
    const currentMinutes = date.getMinutes();
    // Calculate the remainder from current step
    const remainder = currentMinutes % step;

    // If already at a step boundary, no change needed
    if (remainder === 0) {
      return setMinutes(date, currentMinutes);
    }

    // Always round up to next step boundary
    const roundedMinutes = currentMinutes + (step - remainder);

    // Handle overflow to next hour
    if (roundedMinutes >= 60) {
      date = addHours(date, 1);
      return setMinutes(date, 0);
    }

    return setMinutes(date, roundedMinutes);
  }

  static isSameDay(
    date1: Date | string | null | undefined,
    date2: Date | string | null | undefined
  ): boolean {
    if (!date1 || !date2) {
      return false;
    }

    if (typeof date1 === 'string') {
      date1 = new Date(date1);
    }

    if (typeof date2 === 'string') {
      date2 = new Date(date2);
    }

    return isSameDay(date1, date2);
  }

  static getRoundedDate(date: Date, step: number): Date {
    // Create base date with seconds and milliseconds set to 0
    let roundedDate = setSeconds(date, 0);
    roundedDate = setMilliseconds(roundedDate, 0);

    return DateHelpers.roundToNearestStep(roundedDate, step);
  }
}
