import { Component, OnInit } from '@angular/core';
import { JsonPaginatorService } from '../json-paginator.service';
import { TabelaListService } from '../tabela-list/tabela-list.service';

@Component({
  selector: 'app-meu-paginador',
  templateUrl: './meu-paginador.component.html',
  styleUrls: ['./meu-paginador.component.scss']
})
export class MeuPaginadorComponent implements OnInit {

  data;
  dataHead;
  dataPag;
  pageNumber = [];
  pageLinhas;
  gotopag = 1;
  orderVet = 1;
  orderHead = '';
  searchText = '';


  constructor(
      private jsonPaginatorService: JsonPaginatorService,
      private tabelaListService: TabelaListService
      ) { }

  ngOnInit() {
    this.tabelaListService.getTabela(1)
      .subscribe(data => {
        this.data = data;
        this.jsonPaginatorService.dataSource.setDataSource(data);
        this.dataHead = this.jsonPaginatorService.dataSource.columnHeaders;
        this.dataPag = this.jsonPaginatorService.dataSource.getSlice(1);
        for (let i = 1; i <= this.jsonPaginatorService.dataSource.paginaTotal; i++) {
          this.pageNumber.push(i);
         }
      });
  }

  btnNext() {
    console.log('Next...');
    this.dataPag = this.jsonPaginatorService.dataSource.goNext();
    this.gotopag = this.jsonPaginatorService.dataSource.paginaAtual;
  }

  btnPrev() {
    console.log('Prior...');
    this.dataPag = this.jsonPaginatorService.dataSource.goPrior();
    this.gotopag = this.jsonPaginatorService.dataSource.paginaAtual;
  }

  btnSlice(nPage) {
    if (nPage > 0) { this.gotopag = nPage; }
    this.dataPag = this.jsonPaginatorService.dataSource.getSlice(this.gotopag);
  }

  tbhOrdenar(nomeCol) {
    console.log('Ordenando...');
    let vet;
    this.orderHead = nomeCol;
    if (this.orderVet === 1) {
      vet = -1;
    } else {
      vet = 1;
    }
    this.orderVet = vet;
    this.data = this.jsonPaginatorService.dataSource.ordenar(this.data, nomeCol, vet);
    this.dataPag = this.data.slice(0, this.jsonPaginatorService.dataSource.linhasPorPagina);
  }

  searchItems() {
    this.dataPag = this.jsonPaginatorService.dataSource.encontrar(this.searchText, 'descricao');
  }

}
