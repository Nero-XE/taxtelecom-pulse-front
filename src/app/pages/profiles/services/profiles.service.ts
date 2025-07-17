import { inject, Injectable } from '@angular/core';
import { ApiProfilesService } from './api-profiles.service';
import { map, Observable } from 'rxjs';
import { ProfilesResponse } from '../profiles.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private readonly apiProfilesService = inject(ApiProfilesService);

  list(query: string | null): Observable<ProfilesResponse> {
    return this.apiProfilesService.list(query).pipe(
      map((response) => response)
    )
  }
}
