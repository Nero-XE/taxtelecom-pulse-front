import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TuiAutoColorPipe, TuiButton, TuiIcon, TuiLoader, tuiLoaderOptionsProvider, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar, TuiFade, TuiTooltip } from '@taiga-ui/kit';
import { UserInitialsPipe } from '../../pipes/user-initials.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { MoodleService } from './services/moodle.service';
import { MoodleResponseItems } from './moodle.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-moodle',
  imports: [
    TuiTextfield,
    TuiIcon,
    TuiTooltip,
    TuiFade,
    TuiAvatar,
    TuiAutoColorPipe,
    UserInitialsPipe,
    FormatDatePipe,
    TuiButton,
    ReactiveFormsModule,
    TuiLoader,
    RouterModule
  ],
  templateUrl: './moodle.component.html',
  styleUrl: './moodle.component.less',
  providers: [tuiLoaderOptionsProvider({size: 'xl'})]
})
export class MoodleComponent implements OnInit {
  private readonly moodleService = inject(MoodleService)
  private readonly destroyRef = inject(DestroyRef)

  protected moodles = signal<MoodleResponseItems[]>([])
  protected readonly isLoading = signal<boolean>(true)

  protected searchQuery = new FormControl('')

  private getMoodles(query: string | null) {
    this.moodleService.list(query).pipe(
      tap((response) => {
        for (const item of response.items) {
          this.moodles().push(item)
        }
        this.isLoading.set(false)
      }),
      catchError((error: string) => {
        this.isLoading.set(false);
        return throwError(() => error);
      }),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe()
  }

  constructor() {
    this.searchQuery.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      tap(() => this.isLoading.set(true)),
      switchMap(query =>
        this.moodleService.list(query || '')
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      response => {
        this.moodles.set(response.items);
        this.isLoading.set(false)
      }
    )
  }

  ngOnInit(): void {
    this.getMoodles('')
  }
}
