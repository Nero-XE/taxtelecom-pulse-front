import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiAutoColorPipe, TuiButton, TuiIcon, TuiLoader, tuiLoaderOptionsProvider, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar, TuiFade, TuiTooltip } from '@taiga-ui/kit';
import { ProfilesService } from './services/profiles.service';
import { ProfilesResponseItems } from './profiles.interfaces';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profiles',
  imports: [TuiTextfield, TuiIcon, TuiTooltip, ReactiveFormsModule, TuiFade, TuiAvatar, TuiAutoColorPipe, TuiButton, TuiLoader, RouterModule],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.less',
  providers: [tuiLoaderOptionsProvider({size: 'xl'})]
})

export class ProfilesComponent implements OnInit {
  private readonly profilesService = inject(ProfilesService)
  private readonly destroyRef = inject(DestroyRef)

  protected profiles = signal<ProfilesResponseItems[]>([])
  protected readonly isLoading = signal<boolean>(true)

  protected searchQuery = new FormControl('')

  private getApplications(query: string | null) {
    this.profilesService.list(query).pipe(
      tap((response) => {
        for (const item of response.items) {
          this.profiles().push(item)
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
        this.profilesService.list(query || '')
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      response => {
        this.profiles.set(response.items);
        this.isLoading.set(false)
      }
    )
  }

  ngOnInit(): void {
    this.getApplications('')
  }

  protected getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join('')
  }
}
