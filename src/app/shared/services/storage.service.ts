import { Injectable, signal } from '@angular/core';
import { PERFIL_KEY, TOKEN_KEY, USER_KEY } from '../models/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user: any = signal(null);

  constructor() { }

  public getToken(): string | null {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }
    return null;
  }

  public setToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  private removeToken(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  public setUser(user: string): void {
    window.sessionStorage.setItem(USER_KEY, user);
    this.user.set(user);
  }

  public getUser(): any {
    return window.sessionStorage.getItem(USER_KEY);
  }

  private removeUser(): void {
    window.sessionStorage.removeItem(USER_KEY);
    this.user.set(null);
  }

  public setPerfil(perfil: string): void {
    window.sessionStorage.setItem(PERFIL_KEY, perfil);
  }

  public getPerfil(): any {
    return window.sessionStorage.getItem(PERFIL_KEY);
  }

  private removePerfil(): void {
    window.sessionStorage.removeItem(PERFIL_KEY);
  }

  public doLogin(token: string, user: string, perfil: string): void{
    this.setToken(token);
    this.user(user);
    this.setPerfil(perfil);
  }
  public doLogoff(): void {
    this.removeToken();
    this.removeUser();
    this.removePerfil();
  }
}