import { inject, Injectable } from '@angular/core';
import { ApiAuthService } from '../../../services/auth/api-auth.service';
import { AuthRequest } from '../auth.interface';
import { map, Observable } from 'rxjs';
import { CookieService } from '../../../services/storage/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiAuthService = inject(ApiAuthService);
  private readonly cookieService = inject(CookieService);

  login(authData: AuthRequest): Observable<boolean> {
    return this.apiAuthService.auth(authData).pipe(
      map((response) => {
        const expiresTime = new Date(Date.now() + 30 * 24 * 3600 * 1000).toUTCString();
        this.cookieService.set('token', response.token, { 'expires': expiresTime });
        return true;
      }),
    );
  }
}
