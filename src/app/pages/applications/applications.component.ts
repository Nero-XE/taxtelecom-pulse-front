import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TuiAutoColorPipe, TuiButton, TuiDialogContext, TuiDialogService, TuiIcon, TuiLoader, tuiLoaderOptionsProvider, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar, TuiFade, TuiFileLike, TuiFiles, TuiPagination, TuiTooltip } from '@taiga-ui/kit';
import { ApplicationsService } from './services/applications.service';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, Observable, of, Subject, switchMap, tap, throwError, timer } from 'rxjs';
import { ApplicationsResponse } from './applications.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import type {PolymorpheusContent} from '@taiga-ui/polymorpheus';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserInitialsPipe } from '../../pipes/user-initials.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { LoggingService } from '../../services/log/logging.service';

@Component({
  selector: 'app-applications',
  imports: [
    TuiButton, 
    TuiTextfield, 
    TuiIcon, 
    TuiTooltip, 
    TuiAvatar, 
    TuiAutoColorPipe, 
    TuiFade, 
    TuiLoader, 
    TuiFade, 
    ReactiveFormsModule, 
    RouterModule,
    TuiFiles,
    UserInitialsPipe,
    FormatDatePipe,
    AsyncPipe,
    NgIf,
    TuiPagination
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.less',
  providers: [tuiLoaderOptionsProvider({size: 'xl'})]
})

export class ApplicationsComponent implements OnInit {
  private readonly loggingService = inject(LoggingService)

  private readonly applicationsService = inject(ApplicationsService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly dialogs = inject(TuiDialogService);

  protected readonly isLoading = signal<boolean>(true)
  protected readonly router = inject(Router)

  protected readonly applications = signal<ApplicationsResponse | null>(null)
  protected searchQuery = new FormControl('')

  constructor() {
    this.searchQuery.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      tap(() => this.isLoading.set(true)),
      switchMap(query =>
        this.applicationsService.list(query || '', 1)
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      response => {
        this.applications.set(response);
        this.isLoading.set(false)
      }
    )
  }

  ngOnInit(): void {
    this.getApplications('', 1)
  }

  getApplications(query: string | null, selectedPage: number) {
    this.applicationsService.list(query, selectedPage).pipe(
      tap((response) => {
        this.applications.set(response)
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

  protected showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  protected readonly control = new FormControl<TuiFileLike | null>(
    null,
    Validators.required,
  );

  protected readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => this.processFile(file)),
  );

  protected removeFile(): void {
    this.control.setValue(null);
  }

  protected processFile(file: TuiFileLike | null): Observable<TuiFileLike | null> {
    if (this.control.invalid || !file) {
        return of(null);
    }

    this.loadingFiles$.next(file);

    return timer(3000).pipe(
      map(() => {
          return file;
      }),
      finalize(() => this.loadingFiles$.next(null)),
    );

  }

  protected createApplication() {
    this.applicationsService.create({
      id: 8,
      profile: 8,
      division: 2,
      status: 1,
      resCity: 4,
      eduCity: 7,
      eduOrg: 7,
      moodle: null,
      course: "Закончил обучение",
      comment: "Опыт в Figma и Adobe XD",
      email: "novikov_igor@mail.com",
    }).pipe(
      tap(() => {
        this.loggingService.log('Пользователь загрузил новую анкету')
        location.reload()
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }
}
