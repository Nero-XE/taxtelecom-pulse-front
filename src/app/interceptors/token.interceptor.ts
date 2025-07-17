import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from '../services/storage/cookie.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService)
  const token = cookieService.get('token')

  const reqWithToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(reqWithToken);
};