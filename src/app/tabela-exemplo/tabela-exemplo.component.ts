import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableService } from 'angular-bootstrap-md';

@Component({
  selector: 'app-tabela-exemplo',
  templateUrl: './tabela-exemplo.component.html',
  styleUrls: ['./tabela-exemplo.component.scss']
})
export class TabelaExemploComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbPagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;

  elements: any = [];
  headElements = ['ID', 'First', 'Last', 'Handle'];

  searchText = '';
  previous: string;

  firstItemIndex;
  lastItemIndex;

  constructor(private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef) {
  }

  @HostListener('input') oninput() {
    this.mdbPagination.searchText = this.searchText;
  }

  ngOnInit() {
    for (let i = 1; i <= 20; i++) {
      this.elements.push({ id: i.toString(), first: 'Wpis ' + i, last: 'Last ' + i, handle: 'Handle ' + i });
    }

    this.tableService.setDataSource(this.elements);
    this.elements = this.tableService.getDataSource();
    this.previous = this.tableService.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbPagination.setMaxVisibleItemsNumberTo(3);
    this.firstItemIndex = this.mdbPagination.firstItemIndex;
    this.lastItemIndex = this.mdbPagination.lastItemIndex;

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addNewRow() {
    // tslint:disable-next-line:max-line-length
    this.tableService.addRow({ id: this.elements.length.toString(), first: 'Wpis ' + this.elements.length, last: 'Last ' + this.elements.length, handle: 'Handle ' + this.elements.length });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.tableService.addRowAfter(1, { id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy' });
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

  onRowCreate(e) {
    //
  }

  onRowRemove(e) {
    //
  }

}
