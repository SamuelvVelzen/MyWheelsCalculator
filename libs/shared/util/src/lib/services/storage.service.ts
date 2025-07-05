import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

export type StorageType = 'localStorage' | 'sessionStorage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Set a value in storage
   * @param key - The key to store the value under
   * @param value - The value to store
   * @param storageType - Type of storage to use (defaults to localStorage)
   */
  setItem(
    key: string,
    value: string,
    storageType: StorageType = 'localStorage'
  ): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const storage = this.getStorage(storageType);
      storage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set item in ${storageType}:`, error);
    }
  }

  /**
   * Get a value from storage
   * @param key - The key to retrieve
   * @param storageType - Type of storage to use (defaults to localStorage)
   * @returns The stored value or null if not found
   */
  getItem(
    key: string,
    storageType: StorageType = 'localStorage'
  ): string | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const storage = this.getStorage(storageType);
      return storage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item from ${storageType}:`, error);
      return null;
    }
  }

  /**
   * Remove a value from storage
   * @param key - The key to remove
   * @param storageType - Type of storage to use (defaults to localStorage)
   */
  removeItem(key: string, storageType: StorageType = 'localStorage'): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const storage = this.getStorage(storageType);
      storage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove item from ${storageType}:`, error);
    }
  }

  /**
   * Clear all items from storage
   * @param storageType - Type of storage to use (defaults to localStorage)
   */
  clear(storageType: StorageType = 'localStorage'): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const storage = this.getStorage(storageType);
      storage.clear();
    } catch (error) {
      console.warn(`Failed to clear ${storageType}:`, error);
    }
  }

  /**
   * Check if storage is available
   * @param storageType - Type of storage to check
   * @returns True if storage is available, false otherwise
   */
  isAvailable(storageType: StorageType = 'localStorage'): boolean {
    if (!this.isBrowser) {
      return false;
    }

    try {
      const storage = this.getStorage(storageType);
      const testKey = '__storage_test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  private getStorage(storageType: StorageType): Storage {
    return storageType === 'localStorage'
      ? window.localStorage
      : window.sessionStorage;
  }
}
