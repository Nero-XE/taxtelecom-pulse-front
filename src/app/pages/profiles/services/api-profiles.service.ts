import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProfilesResponse } from '../profiles.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiProfilesService {
  private readonly http = inject(HttpClient)
  private readonly apiProfilesListEndpoint = environment.API_ENDPOINTS.PROFILES.LIST

  list(query: string | null): Observable<ProfilesResponse> {
    return this.http.get<ProfilesResponse>(this.apiProfilesListEndpoint, {
      params: {
        fields: 'created,fullName,id',
        filter: `fullName?~'${query}'`,
        sort: '-created',
      }
    })
  }
}
