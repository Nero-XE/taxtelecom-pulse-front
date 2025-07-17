import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const apiRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const reqUrl = req.url;
  const apiUrl = environment.API_URL;

  const newReq = req.clone({
    url: `${apiUrl}/${reqUrl}`,
  });

  return next(newReq);
};
