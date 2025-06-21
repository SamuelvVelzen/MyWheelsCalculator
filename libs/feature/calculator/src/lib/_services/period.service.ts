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

    // Already at a 15-minute increment, no change needed
    if (currentMinutes % 15 === 0) {
      return setMinutes(roundedDate, currentMinutes);
    }

    // Round up to :15
    if (currentMinutes < 15) {
      return setMinutes(roundedDate, 15);
    }

    // Round up to :30
    if (currentMinutes < 30) {
      return setMinutes(roundedDate, 30);
    }

    // Round up to :45
    if (currentMinutes < 45) {
      return setMinutes(roundedDate, 45);
    }

    // Round up to next hour :00
    roundedDate = addHours(roundedDate, 1);
    return setMinutes(roundedDate, 0);
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
