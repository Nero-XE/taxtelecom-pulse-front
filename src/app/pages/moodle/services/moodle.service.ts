import { inject, Injectable } from '@angular/core';
import { ApiMoodleService } from './api-moodle.service';
import { MoodleResponse, MoodleResponseItems } from '../moodle.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoodleService {
  private readonly apiMoodleService = inject(ApiMoodleService)

  list(query: string | null): Observable<MoodleResponse> {
    return this.apiMoodleService.list(query).pipe(
      map((response) => response)
    )
  }

  view(id: number): Observable<MoodleResponseItems> {
    return this.apiMoodleService.view(id).pipe(
      map((response) => response)
    )
  }
}
