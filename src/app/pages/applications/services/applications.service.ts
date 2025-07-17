import { inject, Injectable } from '@angular/core';
import { ApiApplicationsService } from './api-applications.service';
import { map, Observable } from 'rxjs';
import { ApplicationRequest, ApplicationsResponse } from '../applications.interfaces';
import { ApplicationDetailsResponse } from '../../application-details/application-details.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private readonly apiApplicationsService = inject(ApiApplicationsService)

  list(query: string | null, selectedPage: number): Observable<ApplicationsResponse> {
    return this.apiApplicationsService.list(query, selectedPage).pipe(
      map((response) => response)
    )
  }

  view(id: number): Observable<ApplicationDetailsResponse> {
    return this.apiApplicationsService.view(id).pipe(
      map(response => response)
    )
  }

  create(data: ApplicationRequest): Observable<ApplicationRequest> {
    return this.apiApplicationsService.create(data).pipe(
      map(response => response)
    )
  }
}
