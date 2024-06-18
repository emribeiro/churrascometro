import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent {

  churrascos = [
    {id: 1, usuario: 'churras', qtAdultos: 20, qtCriancas: 5, total: 450.00, data: "20/03/2024"},
    {id: 1, usuario: 'churras', qtAdultos: 20, qtCriancas: 5, total: 980.00, data: "20/03/2024"},
    {id: 1, usuario: 'churras', qtAdultos: 20, qtCriancas: 5, total: 370.00, data: "20/03/2024"},
    {id: 1, usuario: 'churras', qtAdultos: 20, qtCriancas: 5, total: 889.00, data: "20/03/2024"},
    {id: 1, usuario: 'churras', qtAdultos: 20, qtCriancas: 5, total: 889.00, data: "20/03/2024"}
  ]
  colunas: string[] = ['usuario', 'qtAdultos', 'qtCriancas', 'total'];

}
