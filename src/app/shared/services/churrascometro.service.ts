import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Carne } from '../models/Carne';
import { Bebida } from '../models/Bebida';
import { API_URL } from '../models/constants/constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {

  private carnes = signal<Carne[]>([]);
  public getCarnes = this.carnes.asReadonly();
  private bebidas = signal<Bebida[]>([]);
  public getBebidas = this.bebidas.asReadonly();
  private produto = signal<any | null>(null);
  public getProduto = this.produto.asReadonly();

  constructor(private http: HttpClient, private router: Router) { }

  httpGetCarnes(): Observable<Carne[]>{
    return this.http.get<Carne[]>(`${API_URL}/carnes`).pipe(
      tap((carnes) => {
        this.carnes.set(carnes);
      }),
      catchError(this.handlerError)
    )
  }

  httpGetBebidas(): Observable<Bebida[]>{
    return this.http.get<Bebida[]>(`${API_URL}/bebidas`).pipe(
      tap((bebidas) => {
        this.bebidas.set(bebidas);
      }),
      catchError(this.handlerError)
    )
  }

getCarneByName(nome: string): Observable<Carne> {
  return this.http.get<any[]>(`${API_URL}/carnes`).
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
  return this.http.get<any[]>(`${API_URL}/bebidas`).
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
  return this.http.post<any>(`${API_URL}/${endpoint}`, carne).pipe(
    tap((produto: any) => {
      this.produto.set(produto); 
    }),
    catchError(this.handlerError)
  )
}

httpUpdateProduto(id: string, endpoint: string, produto: any): Observable<any> {
  return this.http.put<any>(`${API_URL}/${endpoint}/${id}`, produto).pipe(
    tap((produto: any) => {
      this.produto.set(produto); 
    }),
    catchError(this.handlerError)
  )
}

httpDeleteProduto(id: string, endpoint: string): Observable<any> {
  return this.http.delete<any>(`${API_URL}/${endpoint}/${id}`).pipe(
    tap(() => {
      this.produto.set(null); 
    }),
    catchError(this.handlerError)
  )
}

httpGetProduto(id: string, endpoint: string): Observable<any>{
  return this.http.get<any>(`${API_URL}/${endpoint}/${id}`).pipe(
    tap((produto: any) => {
      this.produto.set(produto); 
    }),
    catchError(this.handlerError)
  );
}


  private handlerError(error: HttpErrorResponse): Observable<any>{
    console.error('Ocorreu um erro: ' + error);
    this.router.navigate(['/error/', error.status], { queryParams: { message: error.message }});
    return throwError(() => error);
  }
}
