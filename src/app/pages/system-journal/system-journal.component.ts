import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiLoader, tuiLoaderOptionsProvider, TuiTextfield } from '@taiga-ui/core';
import { TuiTextarea } from '@taiga-ui/kit';
import { SystemJournalService } from './services/system-journal.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LogResponse } from './system-journal.interfaces';

@Component({
  selector: 'app-system-journal',
  imports: [FormsModule, TuiTextfield, TuiTextarea, TuiLoader],
  templateUrl: './system-journal.component.html',
  styleUrl: './system-journal.component.less',
  providers: [tuiLoaderOptionsProvider({size: 'xl'})],
})
export class SystemJournalComponent implements OnInit {
  private readonly desroyRef = inject(DestroyRef);
  private readonly systemJournalService = inject(SystemJournalService);

  protected readonly isLoading = signal<boolean>(true)
  protected readonly logs = signal<LogResponse | null>(null)

  value: string = ''

  ngOnInit(): void {
    this.systemJournalService.list().pipe(
      tap(response => {
        this.isLoading.set(false);
        this.logs.set(response);
        for (const item of this.logs()!.items) {
          this.value += `[${item.created}] ${item.description}\n`
        }
      }),
      takeUntilDestroyed(this.desroyRef)
    )
    .subscribe();
  }
}
