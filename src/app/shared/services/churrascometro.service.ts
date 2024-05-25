import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
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
      catchError(this.handlerError)
    )
  }

  getBebidas(): Observable<Bebida[]>{
    return this.http.get<Bebida[]>(`${this.API_URL}/bebidas`).pipe(
      catchError(this.handlerError)
    )
  }

getCarneByName(nome: string): Observable<Carne> {
  return this.http.get<any[]>(`${this.API_URL}/carnes`).
    pipe(
      map(carnes => {
        const carne = carnes.find((carne: { nome: string }) => carne.nome === nome);

        if (carne) {
          return carne
        }
      }),
      catchError(this.handlerError)
    );
}

getBebidaByName(nome: string): Observable<Bebida> {
  return this.http.get<any[]>(`${this.API_URL}/bebidas`).
    pipe(
      map(bebidas => {
        const bebida = bebidas.find((bebida: { nome: string }) => bebida.nome === nome);

        if (bebida) {
          return bebida
        }
      }),
      catchError(this.handlerError)
    );
}


  private handlerError(error: HttpErrorResponse): Observable<any>{
    console.error('Ocorreu um erro: ' + error);
    return throwError(() => error);
  }
}
