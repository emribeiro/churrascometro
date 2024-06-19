import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { Carne } from '../../shared/models/Carne';
import { Bebida } from '../../shared/models/Bebida';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, RouterLink, MatIconModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent implements OnInit {

  carnes: Carne[] = [];
  bebidas: Bebida[] = [];
  colunasCarnes = ['nome', 'tipo', 'precoKg', 'acoes'];
  colunasBebidas = ['nome', 'tipo', 'precoUn', 'acoes'];

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
