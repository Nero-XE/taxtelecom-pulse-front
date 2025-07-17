import { DestroyRef, inject, Injectable } from '@angular/core';
import { SystemJournalService } from '../../pages/system-journal/services/system-journal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly systemJournalService = inject(SystemJournalService);

  log(info: string) {
    this.systemJournalService.create({description: info}).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
