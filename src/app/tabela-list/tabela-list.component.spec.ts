import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaListComponent } from './tabela-list.component';

describe('TabelaListComponent', () => {
  let component: TabelaListComponent;
  let fixture: ComponentFixture<TabelaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
