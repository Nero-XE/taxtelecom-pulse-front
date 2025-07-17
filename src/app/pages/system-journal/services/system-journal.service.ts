import { inject, Injectable } from '@angular/core';
import { ApiSystemJournalService } from './api-system-journal.service';
import { LogRequest, LogResponse, LogResponseItem } from '../system-journal.interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemJournalService {
  private readonly apiSystemJournalService = inject(ApiSystemJournalService)

  create(data: LogRequest):Observable<LogResponseItem> {
    return this.apiSystemJournalService.create(data).pipe(
      map(response => response)
    );
  }

  list(): Observable<LogResponse> {
    return this.apiSystemJournalService.list().pipe(
      map(response => response)
    );
  }
}
