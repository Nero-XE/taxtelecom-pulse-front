import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { MoodleResponse, MoodleResponseItems } from '../moodle.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMoodleService {
  private readonly http = inject(HttpClient)
  private readonly apiMoodleListEndpoint = environment.API_ENDPOINTS.MOODLE.LIST
  private readonly apiMoodleViewEndpoint = environment.API_ENDPOINTS.MOODLE.VIEW

  list(query: string | null): Observable<MoodleResponse> {
    return this.http.get<MoodleResponse>(this.apiMoodleListEndpoint, {
      params: {
        expand: 'profile,status,target,tests',
        fields: 'id,end_task_date,end_test_date,expand.profile.fullName,expand.profile.id,expand.status.name,expand.status.id,expand.target.name,expand.target.id,expand.tests,start_task_date,start_test_date',
        filter: `profile.fullName?~'${query}'`,
      }
    })
  }

  view(id: number): Observable<MoodleResponseItems> {
    return this.http.get<MoodleResponseItems>(`${this.apiMoodleViewEndpoint}${id}`, {
      params: {
        expand: 'profile,status,target,tests',
        fields: 'id,end_task_date,end_test_date,expand.profile.fullName,expand.status.name,expand.target.name,expand.tests,start_task_date,start_test_date',
      }
    })
  }
}
