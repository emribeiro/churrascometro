import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const homeGuard: CanActivateFn = (route, state) => {
  const serviceLogin = inject(LoginService);
  const router = inject(Router);

  if(serviceLogin.isLoggedIn()){
    if(serviceLogin.isAdmin()){
      router.navigate(['/dashboard']);
      return true;
    }else{
      router.navigate(['/home']);
      return true;
    }
  }

  return true;
};
