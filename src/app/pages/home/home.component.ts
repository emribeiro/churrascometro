import { Component, OnInit } from '@angular/core';
import { Carne } from '../../shared/models/Carne';
import { Bebida } from '../../shared/models/Bebida';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  carnes: Carne[] = [];
  bebidas: Bebida[] = [];
  welcomeMessage = "Bem vindo ao Churrascometro!";

  constructor(private churrascometroService: ChurrascometroService){}

  ngOnInit(): void {
    this.inicializarService();

  }

  inicializarService(){
    console.log('Iniciando!')
    this.churrascometroService.getCarnes().pipe(
      map(carnes => {
        this.carnes = carnes;
      })
    ).subscribe();
    this.churrascometroService.getBebidas().subscribe((bebidas) => {
      this.bebidas = bebidas;
    });
  }

}
