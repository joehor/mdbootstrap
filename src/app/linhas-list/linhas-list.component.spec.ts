import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhasListComponent } from './linhas-list.component';

describe('LinhasListComponent', () => {
  let component: LinhasListComponent;
  let fixture: ComponentFixture<LinhasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
