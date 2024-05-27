import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalhe-churrasco',
  standalone: true,
  imports: [],
  templateUrl: './detalhe-churrasco.component.html',
  styleUrl: './detalhe-churrasco.component.scss'
})
export class DetalheChurrascoComponent //implements OnInit
{
  idStr?: string = '';
  @Input() set id(code: string) {
    console.log('ID', code);
    this.idStr = code;
  }

}