import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../interfaces/application.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private http = inject(HttpClient)

  // Приватная переменная содержащая ссылку на АПИ
  private apiUrl:string = "http://localhost:3000"

  // CRUD функции сервиса
  // Получение всех записей
  indexApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications`)
  }
}
