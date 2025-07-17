import { inject, Injectable } from '@angular/core';
import { ApiAccountsService } from './api-accounts.service';
import { map, Observable } from 'rxjs';
import { AccountRequest, AccountsResponse, AccountsResponseItem } from '../account-management.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly apiAccountsService = inject(ApiAccountsService);

  list(): Observable<AccountsResponse> {
    return this.apiAccountsService.list().pipe(
      map(response => response)
    );
  }

  create(data: AccountRequest): Observable<AccountsResponseItem> {
    return this.apiAccountsService.create(data).pipe(
      map(response => response)
    );
  }

  delete(id: string) {
    return this.apiAccountsService.delete(id);
  }
}
