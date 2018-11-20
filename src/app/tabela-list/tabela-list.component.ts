// import { element } from 'protractor';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableService } from 'angular-bootstrap-md';
import { TabelaListService } from './tabela-list.service';

@Component({
  selector: 'app-tabela-list',
  templateUrl: './tabela-list.component.html',
  styleUrls: ['./tabela-list.component.scss']
})
export class TabelaListComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbPagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;

  elements: any = [];
  // headElements = [];
  headElements = ['id', 'codigo', 'descricao', 'preco'];

  searchText: string;
  previous: string;

  firstItemIndex;
  lastItemIndex;

  constructor(
    private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef,
    private tabelaListService: TabelaListService) { }

  @HostListener('input') oninput() {
    this.mdbPagination.searchText = this.searchText;
  }

  ngOnInit() {
    console.log('ngOnInit INI');
    // this.getTabela(1);
    // this.getTabelaTeste();

    let rows = 1;
    if (this.elements) {
     rows = this.elements.length + 1;
    }

    for (let i = rows; i <= rows + 20; i++) {
      this.elements.push({ id: i.toString(), codigo: 'codigo ' + i, descricao: 'descricao ' + i, preco: 'preco ' + i });
    }
    this.tableService.setDataSource(this.elements);
    this.elements = this.tableService.getDataSource();
    this.previous = this.tableService.getDataSource();

    console.log('ngOnInit FIM');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    // if (this.elements.length > 0) {
    //  console.log('ngAfterViewInit - tem registros...');
    //  this.definePagina();
    // }

    this.mdbPagination.setMaxVisibleItemsNumberTo(3);
    this.firstItemIndex = this.mdbPagination.firstItemIndex;
    this.lastItemIndex = this.mdbPagination.lastItemIndex;

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  definePagina() {
    console.log('Define página');
    this.mdbPagination.setMaxVisibleItemsNumberTo(3);
    this.firstItemIndex = this.mdbPagination.firstItemIndex;
    this.lastItemIndex = this.mdbPagination.lastItemIndex;

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  async getTabela(id) {
    console.log('Inicio getTabela');
    await this.tabelaListService.getTabela(1)
      .subscribe(data => {
      console.log('result getTabela: ' + JSON.stringify(data));
      this.elements = data;
      this.headElements = Object.keys(this.elements[0]);
      this.tableService.setDataSource(this.elements);
      this.elements = this.tableService.getDataSource();
      this.previous = this.tableService.getDataSource();
      console.log('Fim getTabela');

      this.definePagina();
    });
  }

  getTabelaTeste() {
    console.log('getTabelaTeste INI');
    const rows = this.elements.length + 1;
    for (let i = rows; i <= rows + 20; i++) {
      this.elements.push({ id: i.toString(), codigo: 'codigo ' + i, descricao: 'descricao ' + i, preco: 'preco ' + i });
    }

    // this.headElements = Object.keys(this.elements[0]);
    this.tableService.setDataSource(this.elements);
    this.elements = this.tableService.getDataSource();
    this.previous = this.tableService.getDataSource();
    console.log('getTabelaTeste FIM');
  }

  addNewRow() {
    // tslint:disable-next-line:max-line-length
    console.log('addNewRow');
    this.tableService.addRow({
      id: this.elements.length.toString(),
      first: 'Wpis ' + this.elements.length,
      last: 'Last ' + this.elements.length,
      handle: 'Handle ' + this.elements.length });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.tableService.addRowAfter(1, { id: '2', codigo: 'Nowy', last: 'Row', handle: 'Kopytkowy' });
    this.tableService.getDataSource().forEach((el, index) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.tableService.removeLastRow();
    this.emitDataSourceChange();
    this.tableService.rowRemoved().subscribe((data) => {
      console.log(data);
    });
  }

  removeRow() {
    this.tableService.removeRow(1);
    this.tableService.getDataSource().forEach((el, index) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.tableService.rowRemoved().subscribe((data) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.tableService.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  searchItems() {
    const prev = this.tableService.getDataSource();

    if (!this.searchText) {
      this.tableService.setDataSource(this.previous);
      this.elements = this.tableService.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.tableService.searchLocalDataBy(this.searchText);
      this.tableService.setDataSource(prev);
    }

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();

    this.tableService.searchDataObservable(this.searchText).subscribe((data: any) => {
      if (data.length === 0) {
        this.firstItemIndex = 0;
      }

    });
  }

  filtraBusca() {
    let filter = [];
    filter = this.elements
        .filter(e => e.descricao.includes(this.searchText) || e.preco.includes(this.searchText))
        .sort((a, b) => a.descricao.includes(this.searchText) && !b.descricao.includes(this.searchText) ?
           -1 : b.preco.includes(this.searchText) && !a.preco.includes(this.searchText) ? 1 : 0);

    if (filter.length > 0) {
      this.elements = filter;
    }

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();

    this.tableService.searchDataObservable(this.searchText).subscribe((data: any) => {
      if (data.length === 0) {
        this.firstItemIndex = 0;
      }

    });
  }

  onRowCreate(e) {

  }

  onRowRemove(e) {

  }

  isNumber(val): boolean {
    return ! isNaN (val - 0) && val !== null && val !== '' && val !== false;
  }

}
