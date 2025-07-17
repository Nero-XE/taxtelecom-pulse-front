import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountRequest, AccountsResponse, AccountsResponseItem } from '../account-management.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiAccountsService {

  private readonly http = inject(HttpClient);
  private readonly apiEndpoints = environment.API_ENDPOINTS.USERS;

  list(): Observable<AccountsResponse> {
    const { LIST } = this.apiEndpoints
    return this.http.get<AccountsResponse>(LIST, {
      params: {
        fields: 'email, fullName, id'
      }
    })
  }

  create(data: AccountRequest): Observable<AccountsResponseItem> {
    const { LIST } = this.apiEndpoints
    return this.http.post<AccountsResponseItem>(LIST, data, {
      params: {
        fields: 'email, fullName, id'
      }
    })
  }
  
  delete(id: string) {
    const { LIST } = this.apiEndpoints;
    return this.http.delete(`${LIST}/${id}`)
  }
}
