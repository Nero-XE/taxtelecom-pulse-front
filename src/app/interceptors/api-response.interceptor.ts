import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { FailedAuthResponse } from '../pages/auth/auth.interface';

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((httpError: HttpErrorResponse) => {
      const errorResponseBody: FailedAuthResponse = httpError.error;
      let customMessage = errorResponseBody.message;

      switch (errorResponseBody.status) {
        case 400:
          customMessage = 'Неверный запрос. Проверьте вводимые данные.';
          break;
        default:
          customMessage = 'Неизвестная ошибка.';
          break;
      }
      return throwError(() => customMessage);
    }),
  );
};
