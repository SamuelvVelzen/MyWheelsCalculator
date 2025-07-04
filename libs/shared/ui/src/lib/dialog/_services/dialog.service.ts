import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  open(message: string): boolean {
    return confirm(message);
  }
}
