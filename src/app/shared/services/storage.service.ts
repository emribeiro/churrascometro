import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../models/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getToken(): string | null{
    const token = window.sessionStorage.getItem(TOKEN_KEY);

    return token; 
  }

  public setToken(token: string){
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
}
