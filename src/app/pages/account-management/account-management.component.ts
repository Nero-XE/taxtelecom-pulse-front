import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TuiAutoColorPipe, TuiButton, TuiDialogContext, TuiError, TuiHint, TuiLoader, tuiLoaderOptionsProvider, TuiTextfield } from '@taiga-ui/core';
import {TuiResponsiveDialogService} from '@taiga-ui/addon-mobile';
import { TUI_CONFIRM, TuiAvatar, TuiButtonLoading, TuiChip, TuiConfirmData, TuiFade, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { UserInitialsPipe } from '../../pipes/user-initials.pipe';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccountsService } from './services/accounts.service';
import { AccountForm, AccountsResponseItem } from './account-management.interfaces';
import { PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { AccountsFormValidatorsService } from './services/accounts-form-validators.service';
import { LoggingService } from '../../services/log/logging.service';

@Component({
  selector: 'app-account-management',
  imports: [TuiButton, TuiAvatar, UserInitialsPipe, TuiAutoColorPipe, TuiFade, TuiHint, TuiLoader, TuiTextfield, ReactiveFormsModule, TuiError, TuiFieldErrorPipe, AsyncPipe, TuiChip, TuiButtonLoading],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.less',
  providers: [tuiLoaderOptionsProvider({size: 'xl'})]
})
export class AccountManagementComponent implements OnInit {
    private readonly loggingService = inject(LoggingService)

  	private readonly dialogs = inject(TuiResponsiveDialogService);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly isLoading = signal<boolean>(false);
    private readonly accountsService = inject(AccountsService);
    protected readonly accounts = signal<AccountsResponseItem[] | null>(null)
    protected readonly isCreating = signal<boolean>(false);

    private readonly accountsFormValidatorsService = inject(AccountsFormValidatorsService);

    protected readonly accountForm: FormGroup = new FormGroup<AccountForm>({
      email: new FormControl<string | null>(null, {
        validators: [this.accountsFormValidatorsService.emailValidator]
      }),
      fullName: new FormControl<string | null>(null, {
        validators: [Validators.required]
      }),
      password: new FormControl<string | null>(null, {
        validators: [this.accountsFormValidatorsService.passwordValidator]
      })
    })

    protected createAccount() {
      this.isCreating.set(true);
      const formValue = this.accountForm.getRawValue()

      this.accountsService.create(
        {
          email: formValue.email,
          fullName: formValue.fullName,
          password: formValue.password,
          passwordConfirm: formValue.password
        }
      ).pipe(
        tap((response) => {
          this.isCreating.set(false);
          this.loggingService.log(`Добавлен новый пользователь: ${response.fullName}`)
          location.reload();
        }),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe()
    }

    private deleteUser(id: string) {
      this.accountsService.delete(id).pipe(
        tap(() => this.loggingService.log(`Удален пользватель ${id}`)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
    }

    private getUsers() {
      this.isLoading.set(true)
      this.accountsService.list().pipe(
        tap(response => {
          this.accounts.set(response.items)
          this.isLoading.set(false)
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
    }

    protected showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
      this.dialogs.open(content).subscribe();
    }

    protected confirmDelete(userId: string): void {
        const data: TuiConfirmData = {
            content:
                'Вы действительно хотите удалить аккаунт пользователя?',
            yes: 'Да',
            no: 'Нет',
        };

        this.dialogs
            .open<boolean>(TUI_CONFIRM, {
                label: 'Подтвердите удаление',
                size: 's',
                data,
            })
            .pipe(
              tap(response => {
                  if (response === true) {
                    this.deleteUser(userId)
                    setTimeout(() => {
                      this.getUsers()
                    }, 500)
                  }
                }
              ),
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    ngOnInit(): void {
      this.getUsers()
    }
}
