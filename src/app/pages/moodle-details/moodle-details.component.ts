import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TuiButton, TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { MoodleService } from '../moodle/services/moodle.service';
import { MoodleResponseItems } from '../moodle/moodle.interface';
import { catchError, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestInterpretatorPipe } from '../../pipes/test-interpretator.pipe';

@Component({
  selector: 'app-moodle-details',
  imports: [TuiButton, RouterModule, TestInterpretatorPipe, TuiLoader],
  templateUrl: './moodle-details.component.html',
  styleUrl: './moodle-details.component.less',
  providers: [tuiLoaderOptionsProvider({size: 'xl'})]
})
export class MoodleDetailsComponent implements OnInit {
  private readonly moodleService = inject(MoodleService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly route = inject(ActivatedRoute)

  protected readonly isLoading = signal<boolean>(true)
  protected moodle = signal<MoodleResponseItems | null>(null)

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.params['id'])
    this.getMoodle(id)
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


