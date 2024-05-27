import { Routes } from '@angular/router';
import { ListaChurrascoComponent } from './pages/lista-churrasco/lista-churrasco.component';
import { CriacaoChurrascoComponent } from './pages/criacao-churrasco/criacao-churrasco.component';
import { DetalheChurrascoComponent } from './pages/detalhe-churrasco/detalhe-churrasco.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
      path: 'churrascos',
      children: [
        {
          path: '',
          component: ListaChurrascoComponent,
          title: 'Lista de Churrascos',
        },
        {
          path: 'novo',
          component: CriacaoChurrascoComponent,
          title: 'Criar Churrasco',
        },
        {
          path: ':id',
          component: DetalheChurrascoComponent,
          title: 'Detalhe Churrasco'
        }
      ],
    },
    { path: '**', component: NotFoundComponent },
  ];