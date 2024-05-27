import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { ScrollService } from '../../shared/services/scroll.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-criacao-churrasco',
  standalone: true,
  imports: [FormComponent, MatButtonModule],
  templateUrl: './criacao-churrasco.component.html',
  styleUrl: './criacao-churrasco.component.scss'
})
export class CriacaoChurrascoComponent {
  constructor(private scrollService: ScrollService) { }
  rolarToSection(id: string): void {
    this.scrollService.scrollTo(id);
  }
}
