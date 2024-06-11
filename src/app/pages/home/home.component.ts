import { Component, effect, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScrollService } from '../../shared/services/scroll.service';
import { IngredientsComponent } from '../../components/ingredients/ingredients.component';
import { FormComponent } from '../../components/form/form.component';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, IngredientsComponent, FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: []
})
export default class HomeComponent{

  welcomeMessage = "Bem vindo ao Churrascometro!";
  usuario = this.storageService.user.asReadOnly();

  $router = inject(Router);


  constructor(private scrollService: ScrollService, public storageService: StorageService){
    effect(() => {
      if (this.usuario()) {
        this.welcomeMessage = `Bem-vindo ao Churrascômetro ${ this.storageService.user() }!`;
      } else {
        this.welcomeMessage = `Bem-vindo ao Churrascômetro!`;
      }
    })
  }
  
  rolarToSection(id: string): void{
    this.scrollService.scrollTo(id);
  }

  navigateToCreation(){
    this.$router.navigate(['/churrascos/novo']);
  }

}
