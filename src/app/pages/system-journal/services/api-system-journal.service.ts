import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LogRequest, LogResponse, LogResponseItem } from '../system-journal.interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiSystemJournalService {

  private readonly logEndpoint = environment.API_ENDPOINTS.logs
  private readonly http = inject(HttpClient)

  create(data: LogRequest): Observable<LogResponseItem> {
    return this.http.post<LogResponseItem>(this.logEndpoint, data, {params: {
      fields: 'created, description'
    }});
  }

  list(): Observable<LogResponse> {
    return this.http.get<LogResponse>(this.logEndpoint, {params: {
      fields: 'created, description'
    }});
  }
}
