import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  deleteItem(key: string): void {
    return localStorage.removeItem(key);
  }

  clearStorage(): void {
    return localStorage.clear();
  }
}
