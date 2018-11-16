import { Injectable } from '@angular/core';
// import { typeWithParameters } from '@angular/compiler/src/render3/util';
// import { AbstractControlStatus } from '@angular/forms/src/directives/ng_control_status';

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
      this.dataSource.paginaAtual = pag;
      return this.dataSource.data.slice((pag - 1) * this.dataSource.linhasPorPagina, pag * this.dataSource.linhasPorPagina);
    },

    goNext: () => {
      let page = this.dataSource.paginaAtual + 1;
      if (page > this.dataSource.paginaTotal) {
        page--;
      }
      return this.dataSource.getSlice(page);
    },

    goPrior: () => {
      let page = this.dataSource.paginaAtual - 1;
      if (this.dataSource.paginaAtual < 1) {
        page++;
       }
       return this.dataSource.getSlice(page);
    },

    printLog() {
      console.log('paginaAtual: ' + this.paginaAtual);
      console.log('paginaTotal: ' + this.paginaTotal);
    },

    ordenar(ds, col, v) {
      return ds.sort((a, b) => (a[col] > b[col]) ? 1 * v : ((b[col] > a[col]) ? -1 * v : 0));
    },

    encontrar(text, colunas) {
      let aCols = new Array(0);

      if (colunas === '') {
        if (typeof(colunas) === 'string') {
          aCols.push(colunas);
        }
      } else {
        aCols = this.columnHeaders;
      }

      if (text) {
        return this.data.filter(el => {
          for (const k of aCols) {
            // campos numéricos não tem função search, nem convertendo para string ...
            if (typeof(el[k]) === 'string') {
              if (el[k].toLowerCase().search(text.toLowerCase()) > -1) {
                return true;
              }
            }
          }
        })
        .splice(0, this.linhasPorPagina);
      } else {
        return this.data.splice(0, this.linhasPorPagina);
      }
    }

  };

}
