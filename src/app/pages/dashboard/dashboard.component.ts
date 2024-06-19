import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { Churrasco } from '../../shared/models/churrasco/Churrasco';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent implements OnInit{

  totalProdutos: number = 0;
  churrascos: Churrasco[] = [];

  constructor(private service: ChurrascometroService){

    effect(() => {
      this.totalProdutos = this.service.getBebidas().length + this.service.getCarnes().length;
      this.churrascos = this.service.getChurrascos();
    });
  }
  

  ngOnInit(): void {
    this.service.httpGetBebidas().subscribe();
    this.service.httpGetCarnes().subscribe();
    this.service.httpGetChurrascos().subscribe();
  }

  colunas: string[] = [ 'tipo', 'qtAdultos', 'qtCriancas', 'total'];

}
