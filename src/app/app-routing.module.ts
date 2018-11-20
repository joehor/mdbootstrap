import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinhasListComponent } from './linhas-list/linhas-list.component';
import { TabelaListComponent } from './tabela-list/tabela-list.component';
import { MeuPaginadorComponent } from './meu-paginador/meu-paginador.component';
import { TabelaExemploComponent } from './tabela-exemplo/tabela-exemplo.component';

const routes: Routes = [
  { path: 'tabelaexemplo', component: TabelaExemploComponent },
  { path: 'tabela', component: TabelaListComponent},
  { path: 'meupaginador', component: MeuPaginadorComponent},
  { path: 'linhas', component: LinhasListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
