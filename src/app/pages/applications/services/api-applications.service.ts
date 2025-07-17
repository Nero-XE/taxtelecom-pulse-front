import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApplicationRequest, ApplicationsResponse } from '../applications.interfaces';
import { ApplicationDetailsResponse } from '../../application-details/application-details.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiApplicationsService {
  private readonly http = inject(HttpClient)
  private readonly apiApplicationsListEndpoint = environment.API_ENDPOINTS.APPLICATIONS.LIST
  private readonly viewEndpoint = environment.API_ENDPOINTS.APPLICATIONS.VIEW
  private readonly createEndpoint = environment.API_ENDPOINTS.APPLICATIONS.CREATE

  list(query: string | null, selectedPage: number):Observable<ApplicationsResponse> {
    return this.http.get<ApplicationsResponse>(this.apiApplicationsListEndpoint, {
      params: {
        expand: 'division,eduOrg,profile,resCity,status',
        fields: 'created,id,profile,expand.division.name,expand.eduOrg.name,expand.profile.fullName,expand.resCity.name,expand.status.name',
        filter: `profile.fullName?~'${query}'`,
        sort: '-created',
        perPage: 6,
        page: selectedPage
      }
    });
  }

  view(id: number): Observable<ApplicationDetailsResponse> {
    return this.http.get<ApplicationDetailsResponse>(`${this.viewEndpoint}${id}`, {
      params: {
        expand: 'division,eduCity,eduOrg,moodle,profile,resCity,status',
        fields: 'comment,course,created,email,expand.division.name,expand.eduCity.name,expand.eduOrg.name,expand.profile.fullName,expand.resCity.name,expand.status.name,expand.moodle.end_task_date,expand.moodle.end_test_date,expand.moodle.start_task_date,expand.moodle.start_test_date,expand.moodle.status,expand.moodle.target,expand.moodle.tests, id'
      }
    })
  }

  create(data: ApplicationRequest): Observable<ApplicationRequest> {
    return this.http.post<ApplicationRequest>(this.createEndpoint, data, {
      params: {
        fields: 'profile,division,status,resCity,eduCity,eduOrg,moodle,course,comment,email'
      }
    })
  }

}
