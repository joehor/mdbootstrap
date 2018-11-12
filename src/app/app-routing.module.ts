import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinhasListComponent } from './linhas-list/linhas-list.component';
import { TabelaListComponent } from './tabela-list/tabela-list.component';

const routes: Routes = [
  { path: 'linhas', component: LinhasListComponent},
  { path: 'tabela', component: TabelaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
