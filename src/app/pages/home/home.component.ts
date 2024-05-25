import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScrollService } from '../../shared/services/scroll.service';
import { IngredientsComponent } from '../../components/ingredients/ingredients.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, IngredientsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  welcomeMessage = "Bem vindo ao Churrascometro!";

  constructor(private scrollService: ScrollService){}
  
  rolarToSection(id: string): void{
    this.scrollService.scrollTo(id);
  }

}
