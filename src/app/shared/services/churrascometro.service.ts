import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Carne } from '../models/Carne';
import { Bebida } from '../models/Bebida';

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {

  private API_URL = 'http://localhost:3000'
  private carnes = signal<Carne[]>([]);
  public getCarnes = this.carnes.asReadonly();
  private produto = signal<any | null>(null);
  public getProduto = this.produto.asReadonly();

  constructor(private http: HttpClient) { }

  httpGetCarnes(): Observable<Carne[]>{
    return this.http.get<Carne[]>(`${this.API_URL}/carnes`).pipe(
      tap((carnes) => {
        this.carnes.set(carnes);
      }),
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

httpCreateProduto(carne: any, endpoint: string): Observable<any> {
  return this.http.post<any>(`${this.API_URL}/${endpoint}`, carne).pipe(
    tap((produto: any) => {
      this.produto.set(produto); 
    }),
    catchError(this.handlerError)
  )
}

httpUpdateProduto(id: string, endpoint: string, produto: any): Observable<any> {
  return this.http.put<any>(`${this.API_URL}/${endpoint}/${id}`, produto).pipe(
    tap((produto: any) => {
      this.produto.set(produto); 
    }),
    catchError(this.handlerError)
  )
}

httpGetProduto(id: string, endpoint: string): Observable<any>{
  return this.http.get<any>(`${this.API_URL}/${endpoint}/${id}`).pipe(
    tap((produto: any) => {
      this.produto.set(produto); 
    }),
    catchError(this.handlerError)
  );
}


  private handlerError(error: HttpErrorResponse): Observable<any>{
    console.error('Ocorreu um erro: ' + error);
    return throwError(() => error);
  }
}
