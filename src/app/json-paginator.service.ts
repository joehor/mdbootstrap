import { Injectable } from '@angular/core';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class JsonPaginatorService {

  constructor() { }

  dataSource = {
    data: [],
    paginaAtual: 1,
    paginaTotal: 1,
    linhasPorPagina: 3,
    columnHeaders: [],

    setDataSource: (arr) => {
      this.dataSource.data = arr;
      this.dataSource.columnHeaders = Object.keys(arr[0]);
      this.dataSource.setPaginas();
    },

    setPaginas: () => {
      if (this.dataSource.data.length > 0) {
        this.dataSource.paginaTotal = Math.ceil(this.dataSource.data.length / this.dataSource.linhasPorPagina);
      }

    },

    getSlice: (pag) => {
      this.dataSource.printLog();
      this.dataSource.paginaAtual = pag;
      return this.dataSource.data.slice((pag - 1) * this.dataSource.linhasPorPagina, pag * this.dataSource.linhasPorPagina);
    },

    goNext: () => {
      this.dataSource.paginaAtual++;
      if (this.dataSource.paginaAtual > this.dataSource.paginaTotal) {
        this.dataSource.paginaAtual--;
      }
      this.dataSource.printLog();
      return this.dataSource.getSlice(this.dataSource.paginaAtual);
    },

    goPrior: () => {
      this.dataSource.paginaAtual--;
      if (this.dataSource.paginaAtual < 1) {
        this.dataSource.paginaAtual++;
       }
       this.dataSource.printLog();
       return this.dataSource.getSlice(this.dataSource.paginaAtual);
    },

    printLog() {
      console.log('paginaAtual: ' + this.paginaAtual);
      console.log('paginaTotal: ' + this.paginaTotal);
    },

    ordenar(ds, col, v) {
      return ds.sort((a, b) => (a[col] > b[col]) ? 1 * v : ((b[col] > a[col]) ? -1 * v : 0));
      // this.dataSource.data.sort((a, b) => (a[col] > b[col]) ? 1 : ((b[col] > a[col]) ? -1 : 0));
    },

  };

}
