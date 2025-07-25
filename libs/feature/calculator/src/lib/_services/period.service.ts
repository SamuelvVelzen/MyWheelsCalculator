import { inject, Injectable, signal } from '@angular/core';
import { DateHelpers, TranslateService } from '@mwc/util';
import { addHours, differenceInMinutes } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  private readonly _translateService = inject(TranslateService);

  static maxHoursInDay = 10;
  // should be divisible by 60
  static roundToNearestStep = 15;

  startDate = signal<Date>(this._getRoundedStartDate());
  endDate = signal<Date>(addHours(this._getRoundedStartDate(), 4));

  getTotalDepositDays(startDate: Date, endDate: Date): number {
    const billableHours = this.getTotalPeriodTime(startDate, endDate);
    return Math.ceil(billableHours / PeriodService.maxHoursInDay);
  }

  getTotalPeriodTime(startDate: Date, endDate: Date): number {
    const totalMinutes = differenceInMinutes(endDate, startDate);
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
  }

  getFormattedPeriodTime(startDate: Date, endDate: Date): string {
    const totalHours = this.getTotalPeriodTime(startDate, endDate);

    // If maxHoursInDay hours or less, show actual hours and minutes
    if (totalHours <= PeriodService.maxHoursInDay) {
      return this._formatHoursMinutes(totalHours);
    }

    // More than maxHoursInDay hours: convert to day format
    const days = Math.floor(totalHours / PeriodService.maxHoursInDay);
    const remainingHours = totalHours % PeriodService.maxHoursInDay;

    // Just days (no remainder)
    if (remainingHours === 0) {
      return this._formatDays(days);
    }

    // Days + remaining hours/minutes
    const dayString = this._formatDays(days);
    const hourString = this._formatHoursMinutes(remainingHours);

    return `${dayString}, ${hourString}`;
  }

  private _getRoundedStartDate(): Date {
    const now = new Date();

    return DateHelpers.getRoundedDate(now, PeriodService.roundToNearestStep);
  }

  private _formatHoursMinutes(hours: number): string {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);

    if (minutes > 0) {
      return `${this._formatHours(wholeHours)},${this._formatMinutes(minutes)}`;
    }
    return this._formatHours(wholeHours);
  }

  private _formatDays(days: number): string {
    return days === 1
      ? this._translateService.translate('common.day')
      : `${days} ${this._translateService.translate('common.days')}`;
  }

  private _formatHours(hours: number): string {
    return hours === 1
      ? this._translateService.translate('common.hour')
      : `${hours} ${this._translateService.translate('common.hours')}`;
  }

  private _formatMinutes(minutes: number): string {
    return minutes === 1
      ? this._translateService.translate('common.minute')
      : `${minutes} ${this._translateService.translate('common.minutes')}`;
  }
}
