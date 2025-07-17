import { Component, DestroyRef, inject, OnDestroy, signal } from '@angular/core';
import { version } from '../../../../package.json';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TUI_DARK_MODE, TuiButton, TuiError, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import {
  TuiButtonLoading,
  TuiFieldErrorPipe,
  TuiPassword,
} from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { AuthForm } from './auth.interface';
import { AuthFormValidatorsService } from './services/auth-form-validators.service';
import { LoginService } from './services/login.service';
import { catchError, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { LoggingService } from '../../services/log/logging.service';

@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiFieldErrorPipe,
    TuiError,
    TuiPassword,
    TuiIcon,
    AsyncPipe,
    TuiButton,
    TuiButtonLoading,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.less',
})
export class AuthComponent implements OnDestroy {
  protected readonly darkMode = inject(TUI_DARK_MODE);

  private readonly loggingService = inject(LoggingService)

  protected readonly appVersion = version.toString().concat(' Альфа');

  private readonly authFormValidators = inject(AuthFormValidatorsService);
  private readonly loginService = inject(LoginService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router)

  protected readonly isLoading = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);

  protected readonly authForm: FormGroup<AuthForm> = new FormGroup({
    identity: new FormControl<string>('', {
      validators: [this.authFormValidators.emailValidator],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: [this.authFormValidators.passwordValidator],
      nonNullable: true,
    }),
  });

  protected auth(): void {
    if (this.authForm.invalid || this.isLoading()) return;

    const authFormValue = this.authForm.getRawValue();

    this.isLoading.set(true);
    this.error.set(null);

    this.loginService
      .login(authFormValue)
      .pipe(
        tap(() => {
          this.loggingService.log(`Пользователь ${authFormValue.identity} авторизовался`)
          this.router.navigateByUrl('/applications')
        }),
        catchError((error: string) => {
          this.isLoading.set(false);
          this.error.set(error);
          return throwError(() => error);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.isLoading.set(false);
  }
}
