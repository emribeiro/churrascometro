import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SigninDialogComponent } from '../../components/signin-dialog/signin-dialog.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export default class HeroComponent {

  dialog = inject(MatDialog);
  
  openSignInDialog(): void{
    this.dialog.open(SigninDialogComponent);
  }
}
