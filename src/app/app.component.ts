import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginService } from './shared/services/login.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'churrascometro';
  user: string = 'letscode';
  pass: string = 'lets@123';

  constructor( private auth: LoginService
             , private storage: StorageService
  ){
    this.login();
  }

  login(){
    this.auth.login(this.user, this.pass).subscribe({
      next: (res) => {
        console.log(res);
        this.storage.setToken(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
