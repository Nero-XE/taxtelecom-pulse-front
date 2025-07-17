import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApplicationDetailsService } from './services/application-details.service';
import { ApplicationDetailsResponse } from './application-details.interfaces';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { TuiAutoColorPipe, TuiButton, TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { TuiAvatar, TuiFade } from '@taiga-ui/kit';
import { UserInitialsPipe } from '../../pipes/user-initials.pipe';
import { MoodleResponseItems } from '../moodle/moodle.interface';
import { MoodleService } from '../moodle/services/moodle.service';

@Component({
  selector: 'app-application-details',
  imports: [FormatDatePipe, TuiButton, RouterModule, TuiAvatar, UserInitialsPipe, TuiAutoColorPipe, TuiFade, TuiLoader],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.less',
  providers: [tuiLoaderOptionsProvider({size: 'xl'})]
})
export class ApplicationDetailsComponent implements OnInit {
  private readonly applicationDetailsService = inject(ApplicationDetailsService)
  private readonly moodleService = inject(MoodleService)
  private readonly destroyRef = inject(DestroyRef)

  private readonly route = inject(ActivatedRoute)

  protected readonly isLoading = signal<boolean>(true)

  protected moodle = signal<MoodleResponseItems | null>(null)
  protected applicationDetails = signal<ApplicationDetailsResponse | null>(null)

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.params['id'])
    this.getApplicationDetails(id)
    this.getMoodle(id)
  }

  private getApplicationDetails(id: number) {
    this.applicationDetailsService.view(id).pipe(
      tap((response) => {
        this.applicationDetails.set(response)
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

  private getMoodle(id: number) {
    this.moodleService.view(id).pipe(
      tap((response) => {
        this.moodle.set(response)
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
}
