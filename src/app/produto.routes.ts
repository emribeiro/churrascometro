import { Routes } from "@angular/router";
import CriacaoProdutoComponent from "./pages/criacao-produto/criacao-produto.component";
import { ListaProdutosComponent } from "./pages/lista-produtos/lista-produtos.component";



export const produtoRoutes: Routes = [
    {
      path: '',
      component: ListaProdutosComponent,
      title: 'Churrascometro - Lista de Produtos'
    },
    {
      path: 'novo',
      component: CriacaoProdutoComponent,
      title: 'Churrascometro - Criação de Produtos',
    },
    {
      path: ':produto/:id',
      component: CriacaoProdutoComponent,
      title: 'Churrascometro - Edição de Produtos',
    },
  ];