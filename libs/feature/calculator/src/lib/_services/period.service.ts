import { computed, Injectable, signal } from '@angular/core';
import {
  addHours,
  differenceInMinutes,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  static maxHoursInDay = 10;
  // should be divisible by 60
  static roundToNearestStep = 15;

  startDate = signal<Date>(this.getRoundedStartDate());
  endDate = signal<Date>(addHours(this.getRoundedStartDate(), 4));

  totalPeriodTime = computed(() => {
    // Calculate total difference in fractional hours (including minutes)
    const totalMinutes = differenceInMinutes(this.endDate(), this.startDate());
    const totalHours = totalMinutes / 60;

    // If total time is within 24 hours, apply the 10-hour cap
    if (totalHours <= 24) {
      return Math.min(totalHours, PeriodService.maxHoursInDay);
    }

    // For periods longer than 24 hours, calculate billing for each 24-hour window
    let billableHours = 0;
    let remainingHours = totalHours;

    // Process complete 24-hour windows
    while (remainingHours > 24) {
      billableHours += PeriodService.maxHoursInDay; // Cap each 24-hour window at 10 hours
      remainingHours -= 24;
    }

    // Process the remaining partial window (< 24 hours)
    billableHours += Math.min(remainingHours, PeriodService.maxHoursInDay);

    return billableHours;
  });

  totalPeriodTimeString = computed(() => {
    const totalHours = this.totalPeriodTime();

    // If 10 hours or less, show actual hours and minutes
    if (totalHours <= PeriodService.maxHoursInDay) {
      return this._formatHoursMinutes(totalHours);
    }

    // More than 10 hours: convert to day format
    const days = Math.floor(totalHours / PeriodService.maxHoursInDay);
    const remainingHours = totalHours % PeriodService.maxHoursInDay;

    // Just days (no remainder)
    if (remainingHours === 0) {
      return days === 1 ? 'day' : `${days} days`;
    }

    // Days + remaining hours/minutes
    const dayString = days === 1 ? 'day' : `${days} days`;
    const hourString = this._formatHoursMinutes(remainingHours);

    return `${dayString} + ${hourString}`;
  });

  private getRoundedStartDate(): Date {
    const now = new Date();
    const currentMinutes = now.getMinutes();

    // Create base date with seconds and milliseconds set to 0
    let roundedDate = setSeconds(now, 0);
    roundedDate = setMilliseconds(roundedDate, 0);

    // Calculate the remainder from current step
    const remainder = currentMinutes % PeriodService.roundToNearestStep;

    // If already at a step boundary, no change needed
    if (remainder === 0) {
      return setMinutes(roundedDate, currentMinutes);
    }

    // Always round up to next step boundary
    const roundedMinutes =
      currentMinutes + (PeriodService.roundToNearestStep - remainder);

    // Handle overflow to next hour
    if (roundedMinutes >= 60) {
      roundedDate = addHours(roundedDate, 1);
      return setMinutes(roundedDate, 0);
    }

    return setMinutes(roundedDate, roundedMinutes);
  }

  private _formatHoursMinutes(hours: number): string {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);

    if (minutes > 0) {
      return `${wholeHours}h ${minutes}m`;
    }
    return `${wholeHours}h`;
  }
}
