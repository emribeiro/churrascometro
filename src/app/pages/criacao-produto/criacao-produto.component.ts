import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProdutoFormComponent } from '../../components/produto-form/produto-form.component';

@Component({
  selector: 'app-criacao-produto',
  standalone: true,
  imports: [ProdutoFormComponent],
  templateUrl: './criacao-produto.component.html',
  styleUrl: './criacao-produto.component.scss'
})
export default class CriacaoProdutoComponent{
  
  paramId!: string;

  @Input() set id(id: string){
    this.paramId = id;
  }

}
