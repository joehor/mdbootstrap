import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

// meus componentes
import { TabelaListComponent } from './tabela-list/tabela-list.component';
import { LinhasListComponent } from './linhas-list/linhas-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TabelaListComponent,
    LinhasListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule, WavesModule, ButtonsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
