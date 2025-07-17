import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthRequest, AuthResponse } from '../../pages/auth/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUsersAuthEndpoint = environment.API_ENDPOINTS.USERS.AUTH;
  private readonly apiUsersRefreshEndpoint = environment.API_ENDPOINTS.USERS.REFRESH;

  auth(authData: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUsersAuthEndpoint, authData);
  }

  refresh(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUsersRefreshEndpoint, undefined)
  }
}
