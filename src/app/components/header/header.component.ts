import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../shared/services/login.service';
import { StorageService } from '../../shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { SigninDialogComponent } from '../signin-dialog/signin-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    RouterLink, 
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user!: string;
  pass!: string;
  

  constructor(
    public loginService: LoginService,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  logout(){
    if (!this.loginService.isLoggedIn()) return;
    this.loginService.logout().subscribe({
      next: () => {
        this.storageService.doLogoff();
        this.router.navigate(['/']);
      }
    });
  }

  openSignInDialog(): void{
    console.log('Try to open');
    this.dialog.open(SigninDialogComponent);
  }
}
