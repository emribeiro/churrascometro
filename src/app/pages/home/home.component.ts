import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScrollService } from '../../shared/services/scroll.service';
import { IngredientsComponent } from '../../components/ingredients/ingredients.component';
import { FormComponent } from '../../components/form/form.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, IngredientsComponent, FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('showForm', [
      state('show',
        style({
          opacity: 1
        })
      ),
      state('hidden',
        style({
          opacity: 0
        })
      ),
      transition('hidden => show', [animate('0.2s ease')]),
      transition('show => hidden', [animate('0.2s ease')]),
      transition('* => show', [animate('0.2s ease')]),
    ])
  ]
})
export class HomeComponent{

  welcomeMessage = "Bem vindo ao Churrascometro!";

  showForm = false;

  constructor(private scrollService: ScrollService){}
  
  rolarToSection(id: string): void{
    this.scrollService.scrollTo(id);
  }

  toogleForm(){
    this.showForm = !this.showForm;
  }

}
