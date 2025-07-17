import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthFormValidatorsService {
  emailValidator(field: AbstractControl): ValidationErrors | null {
    if (!field.value) {
      return { email: 'Адрес эл. почты не может быть пустым' };
    } else if (Validators.email(field)) {
      return { email: 'Неверный формат адреса эл. почты' };
    } else {
      return null;
    }
  }

  passwordValidator(field: AbstractControl): ValidationErrors | null {
    return !field.value ? { password: 'Пароль не может быть пустым' } : null;
  }
}
