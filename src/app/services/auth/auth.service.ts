import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiAuthService } from './api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiAuthService = inject(ApiAuthService)

  refreshToken(): Observable<boolean> {
    return this.apiAuthService.refresh().pipe(
      map(() => true)
    )
  }

  checkToken(): Observable<boolean> {
    return this.apiAuthService.refresh().pipe(
      map(() => true)
    )
  }
}
