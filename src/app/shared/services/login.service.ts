import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, HTTP_OPTIONS } from '../models/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    return this.httpClient.post<any>(`${API_URL}/login`, {login: username, senha: password}, HTTP_OPTIONS);
  }
}
