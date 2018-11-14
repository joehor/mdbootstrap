import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  exports: []
})
export class jsonPaginacao {

  constructor() { }

  dataSource = {
    data: [],
    paginaAtual: 1,
    paginaTotal: 1,
    linhasPorPagina: 3,

    setDatasource: (arr) => {
      this.data = arr;
      this.setPaginas();
    },

    setPaginas: () => {
      if (this.data.length > 0) {
        this.paginas = this.data.length;
      }
    },

    getSlice: (pag) => {
       return this.data.slice((pag-1) * this.linhasPorPagina, pag * this.linhasPorPagina);
    },

    goNext: () => {
       if (this.paginaAtual < this.paginaTotal) {
         return this.getSlice(this.paginaAtual++);
       }
    },

    goPrior: () => {
       if (this.paginaAtual > 0) {
         return this.getSlice(this.paginaAtual--);
       }
    }

  }

}
