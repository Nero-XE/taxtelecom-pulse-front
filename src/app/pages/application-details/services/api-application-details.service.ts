import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationDetailsResponse } from '../application-details.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiApplicationDetailsService {
  private readonly http = inject(HttpClient)
  private readonly apiApplicationsListEndpoint = environment.API_ENDPOINTS.APPLICATIONS.VIEW

  view(id: number):Observable<ApplicationDetailsResponse> {
    return this.http.get<ApplicationDetailsResponse>(`${this.apiApplicationsListEndpoint}${id}`, {
      params: {
        expand: 'division,eduCity,eduOrg,moodle,profile,resCity,status',
        fields: 'comment,course,created,email,expand.division.name,expand.eduCity.name,expand.eduOrg.name,expand.profile.fullName,expand.resCity.name,expand.status.name,expand.moodle.end_task_date,expand.moodle.end_test_date,expand.moodle.start_task_date,expand.moodle.start_test_date,expand.moodle.status,expand.moodle.target,expand.moodle.tests, id',
      }
    });
  }
}
