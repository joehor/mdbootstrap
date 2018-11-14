import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPaginadorComponent } from './meu-paginador.component';

describe('MeuPaginadorComponent', () => {
  let component: MeuPaginadorComponent;
  let fixture: ComponentFixture<MeuPaginadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuPaginadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuPaginadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
