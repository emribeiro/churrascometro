import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../shared/services/login.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-signin-dialog',
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule, 
    MatButtonModule,
    MatInputModule,
    MatFormField,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ReactiveFormsModule],
  templateUrl: './signin-dialog.component.html',
  styleUrl: './signin-dialog.component.scss',
})
export class SigninDialogComponent {

  formLogin!: FormGroup;

  constructor( private formBuilder: FormBuilder
             , private dialog: MatDialog
             , private loginService: LoginService
             , private storageService: StorageService){
    this.formLogin = this.formBuilder.group({
      usuario: new FormControl("", [Validators.required]),
      senha: new FormControl("", [Validators.required])
    });
  }

  login(){
    this.loginService.login( this.formLogin.value.usuario
                           , this.formLogin.value.senha).subscribe({
      next: (res) => {
        this.storageService.doLogin(res.token, res.user, res.perfil);
        this.dialog.closeAll();
      }});
  }

}
