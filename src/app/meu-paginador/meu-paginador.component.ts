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
  gotopag = 1;


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
      });
  }

  btnNext() {
    console.log('Next...');
    this.dataPag = this.jsonPaginatorService.dataSource.goNext();
    console.log('dataPag: ' + this.dataPag);
  }

  btnPrev() {
    console.log('Prior...');
    this.dataPag = this.jsonPaginatorService.dataSource.goPrior();
    console.log('dataPag: ' + this.dataPag);
  }

  btnSlice() {
    console.log('o que tem em dataSource? ' + this.jsonPaginatorService.dataSource.data);
    console.log('Slice...');
    this.dataPag = this.jsonPaginatorService.dataSource.getSlice(this.gotopag);
    console.log('dataPag: ' + this.dataPag);
  }

}
