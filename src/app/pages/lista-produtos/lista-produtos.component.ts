import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { Carne } from '../../shared/models/Carne';
import { Bebida } from '../../shared/models/Bebida';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, RouterLink],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent implements OnInit {

  carnes: Carne[] = [];
  bebidas: Bebida[] = [];
  colunasCarnes = ['nome', 'tipo', 'precoKg'];
  colunasBebidas = ['nome', 'tipo', 'precoUn'];

  constructor(private service: ChurrascometroService){}
  
  ngOnInit(): void {
    this.service.httpGetCarnes().subscribe((carnes) => {
      this.carnes = carnes;
    });
    
    this.service.httpGetBebidas().subscribe((bebidas) => {
      this.bebidas = bebidas;
    });
  }
;


  

}
