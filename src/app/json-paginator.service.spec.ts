import { TestBed } from '@angular/core/testing';

import { JsonPaginatorService } from './json-paginator.service';

describe('JsonPaginatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonPaginatorService = TestBed.get(JsonPaginatorService);
    expect(service).toBeTruthy();
  });
});
