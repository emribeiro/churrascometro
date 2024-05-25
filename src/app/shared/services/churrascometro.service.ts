import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Carne } from '../models/Carne';
import { Bebida } from '../models/Bebida';

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {

  private API_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getCarnes(): Observable<Carne[]>{
    return this.http.get<Carne[]>(`${this.API_URL}/carnes`).pipe(
      catchError(this.handerError)
    )
  }

  getBebidas(): Observable<Bebida[]>{
    return this.http.get<Bebida[]>(`${this.API_URL}/bebidas`).pipe(
      catchError(this.handerError)
    )
  }


  private handerError(error: HttpErrorResponse): Observable<any>{
    console.error('Ocorreu um erro: ' + error);
    return throwError(() => error);
  }
}
