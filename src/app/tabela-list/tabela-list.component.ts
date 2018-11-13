// import { element } from 'protractor';
import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableService } from 'angular-bootstrap-md';
import { TabelaListService } from './tabela-list.service';

@Component({
  selector: 'app-tabela-list',
  templateUrl: './tabela-list.component.html',
  styleUrls: ['./tabela-list.component.scss']
})
export class TabelaListComponent implements OnInit, AfterViewInit  {


  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbPagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;

  elements: any = [];
  headElements;

  searchText: string;
  previous: string;

  firstItemIndex;
  lastItemIndex;

  constructor(
    private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef,
    private tabelaListService: TabelaListService
    ) { }

  @HostListener('input') oninput() {
    this.mdbPagination.searchText = this.searchText;
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.tabelaListService.getTabela(1)
      .subscribe(res => {
        this.elements = res;
        this.headElements = Object.keys(res[0]);

        this.tableService.setDataSource(this.elements);
        this.elements = this.tableService.getDataSource();
        this.previous = this.tableService.getDataSource();
    });
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.mdbPagination.setMaxVisibleItemsNumberTo(3);
    this.firstItemIndex = this.mdbPagination.firstItemIndex;
    this.lastItemIndex = this.mdbPagination.lastItemIndex;

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
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
    console.log('addNewRowAfter');
    this.tableService.addRowAfter(1, { id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy' });
    this.tableService.getDataSource().forEach((el, index) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    console.log('removeLastRow');
    this.tableService.removeLastRow();
    this.emitDataSourceChange();
    this.tableService.rowRemoved().subscribe((data) => {
      console.log(data);
    });
  }

  removeRow() {
    console.log('removeRow');
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
    console.log('emitDataSourceChange');
    this.tableService.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  onNextPageClick(data: any) {
    console.log('onNextPageClick');
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onPreviousPageClick(data: any) {
    console.log('onPreviousPageClick');
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  searchItems() {
    console.log('searchItems');
    const prev = this.tableService.getDataSource();

    if (!this.searchText) {
      console.log('Not searchText');
      this.tableService.setDataSource(this.previous);
      this.elements = this.tableService.getDataSource();
    }

    if (this.searchText) {
      console.log('searchText');
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

  onRowCreate(e) {
    console.log('onRowCreate');
  }

  onRowRemove(e) {
    console.log('onRowRemove');
  }

  isNumber(val): boolean {
    return ! isNaN (val - 0) && val !== null && val !== '' && val !== false;
  }

}
