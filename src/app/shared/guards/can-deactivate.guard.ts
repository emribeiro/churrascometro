import { CanDeactivateFn } from '@angular/router';
import DetalheChurrascoComponent from '../../pages/detalhe-churrasco/detalhe-churrasco.component';

export const canDeactivateGuard: CanDeactivateFn<DetalheChurrascoComponent> = (component, currentRoute, currentState, nextState) => {
  //console.log(component.paramId);
  // if (component.form.valid) {
  //   return true;
  // }
  // return false;

  return confirm('Deseja sair do formulário?');
};