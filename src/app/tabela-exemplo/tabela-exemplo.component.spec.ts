import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaExemploComponent } from './tabela-exemplo.component';

describe('TabelaExemploComponent', () => {
  let component: TabelaExemploComponent;
  let fixture: ComponentFixture<TabelaExemploComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaExemploComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaExemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
