import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Churrasco } from '../../shared/models/churrasco/Churrasco';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';

@Component({
  selector: 'app-lista-churrasco',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './lista-churrasco.component.html',
  styleUrl: './lista-churrasco.component.scss'
})
export default class ListaChurrascoComponent {

  churrascos: Churrasco[] = [];

  constructor(private service: ChurrascometroService){

    effect(() => {
      this.churrascos = this.service.getChurrascos();
    });
  }
  

  ngOnInit(): void {
    this.service.httpGetChurrascos().subscribe();
  }


  
  colunas: string[] = [ 'tipo', 'qtAdultos', 'qtCriancas', 'total'];

}