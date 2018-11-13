import { TestBed } from '@angular/core/testing';

import { LinhasListService } from './linhas-list.service';

describe('LinhasListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinhasListService = TestBed.get(LinhasListService);
    expect(service).toBeTruthy();
  });
});
