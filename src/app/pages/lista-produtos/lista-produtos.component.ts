import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, RouterLink],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent {

  carnes = [
    {nome: 'Picanha', tipo: 'Bovina', precoKg: 89.90},
    {nome: 'Maminha', tipo: 'Bovina', precoKg: 49.90},
    {nome: 'Lombo', tipo: 'Suína', precoKg: 69.90},
  ];

  bebidas = [
    {nome: 'Coca-Cola', tipo: 'Refrigerante', precoUn: 9.90},
    {nome: 'Fanta', tipo: 'Refrigerante', precoUn: 9.90},
    {nome: 'Suco de Uva', tipo: 'Suco', precoUn: 9.90},
    {nome: 'Agua', tipo: 'Agua', precoUn: 9.90},
  ];
  colunasCarnes = ['nome', 'tipo', 'precoKg'];
  colunasBebidas = ['nome', 'tipo', 'precoUn'];

}
