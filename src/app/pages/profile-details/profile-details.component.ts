import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TuiButton, TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { ApplicationsService } from '../applications/services/applications.service';
import { MoodleService } from '../moodle/services/moodle.service';
import { ApplicationDetailsResponse } from '../application-details/application-details.interfaces';
import { catchError, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-profile-details',
  imports: [RouterModule, TuiButton, FormatDatePipe, TuiLoader],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.less',
  providers: [tuiLoaderOptionsProvider({size: 'xl'})]
})
export class ProfileDetailsComponent implements OnInit {
  private readonly applicationService = inject(ApplicationsService)
  private readonly moodleService = inject(MoodleService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly route = inject(ActivatedRoute)

  protected readonly isLoading = signal<boolean>(true)

  protected applicationDetails = signal<ApplicationDetailsResponse | null>(null)

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.params['id'])
    this.getApplicationDetails(id)
  }

  private getApplicationDetails(id: number) {
    this.applicationService.view(id).pipe(
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
}
