import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-churrasco',
  standalone: true,
  imports: [],
  templateUrl: './detalhe-churrasco.component.html',
  styleUrl: './detalhe-churrasco.component.scss'
})
export default class DetalheChurrascoComponent implements OnInit
{
  
  idStr?: string = '';
  
  constructor(public router: ActivatedRoute){}

   ngOnInit(): void {
    this.idStr = this.router.snapshot.params['id'];
  }
}