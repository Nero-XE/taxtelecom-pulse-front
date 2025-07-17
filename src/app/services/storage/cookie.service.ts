import { Injectable } from '@angular/core';

type cookieOptions = { [key: string]: string | number };

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  set(key: string, value: string, options?: cookieOptions): string {
    let cookieBody = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

    if (options === undefined) {
      return (document.cookie = cookieBody);
    }

    for (const option in options) {
      const cookieOption = `${option}=${options[option]}`
      cookieBody += `; ${cookieOption}`;
    }

    return (document.cookie = cookieBody);
  }

  get(key: string): string | null {
    for (const cookies of document.cookie.split('; ')) {
      const [cookieName, cookieValue] = cookies.split('=');

      if (decodeURIComponent(cookieName) === key) {
        return decodeURIComponent(cookieValue);
      }
    }

    return null;
  }

  delete(key: string): void {
    this.set(key, '', { 'max-age': -1 });
  }
}
