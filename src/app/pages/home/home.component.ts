import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScrollService } from '../../shared/services/scroll.service';
import { IngredientsComponent } from '../../components/ingredients/ingredients.component';
import { FormComponent } from '../../components/form/form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, IngredientsComponent, FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: []
})
export class HomeComponent{

  welcomeMessage = "Bem vindo ao Churrascometro!";

  $router = inject(Router);


  constructor(private scrollService: ScrollService){}
  
  rolarToSection(id: string): void{
    this.scrollService.scrollTo(id);
  }

  navigateToCreation(){
    this.$router.navigate(['/churrascos/novo']);
  }

}
