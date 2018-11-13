import { TestBed } from '@angular/core/testing';

import { TabelaListService } from './tabela-list.service';

describe('TabelaListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabelaListService = TestBed.get(TabelaListService);
    expect(service).toBeTruthy();
  });
});
