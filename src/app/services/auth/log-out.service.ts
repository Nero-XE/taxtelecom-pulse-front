import { inject, Injectable } from '@angular/core';
import { CookieService } from '../storage/cookie.service';
import { LoggingService } from '../log/logging.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  private readonly cookieService = inject(CookieService)
  private readonly loggingService = inject(LoggingService)

  logOut(): void {
    this.loggingService.log('Пользователь деавторизовался')
    this.cookieService.delete('token')
  }
}
