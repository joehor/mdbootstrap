import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

// meus componentes
import { TabelaListComponent } from './tabela-list/tabela-list.component';
import { LinhasListComponent } from './linhas-list/linhas-list.component';
import { MeuPaginadorComponent } from './meu-paginador/meu-paginador.component';
import { TabelaExemploComponent } from './tabela-exemplo/tabela-exemplo.component';

@NgModule({
  declarations: [
    AppComponent,
    TabelaListComponent,
    LinhasListComponent,
    MeuPaginadorComponent,
    TabelaExemploComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, FormsModule,
    NavbarModule, WavesModule, ButtonsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
