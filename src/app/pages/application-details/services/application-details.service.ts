import { inject, Injectable } from '@angular/core';
import { ApiApplicationDetailsService } from './api-application-details.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDetailsService {
  private readonly apiApplicationDetailsService = inject(ApiApplicationDetailsService)

  view(id: number) {
    return this.apiApplicationDetailsService.view(id).pipe(
      map((response) => response)
    )
  }
}
