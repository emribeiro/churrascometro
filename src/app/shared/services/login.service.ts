import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, HTTP_OPTIONS } from '../models/constants/constant';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  login(username: string, password: string): Observable<any>{
    return this.httpClient.post<any>(`${API_URL}/login`, {login: username, senha: password}, HTTP_OPTIONS);
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${API_URL}/logout`);
  }

  isLoggedIn(): boolean {
    return this.storageService.getToken() ? true : false;
  }

  isAdmin(): boolean {
    return this.storageService.getPerfil() === 'admin';
  }
}
