import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-churrasco',
  standalone: true,
  imports: [],
  templateUrl: './lista-churrasco.component.html',
  styleUrl: './lista-churrasco.component.scss'
})
export default class ListaChurrascoComponent {
  items = [
    { id: 1, nome: 'Churrasco 1' },
    { id: 2, nome: 'Churrasco 2' },
    { id: 3, nome: 'Churrasco 3' },
  ];

  constructor(private router: Router) { }

  navegarParaDetalhe(code: number) {
    this.router.navigate(['/churrascos', code]);
  }

}