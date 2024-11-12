import { TestBed } from '@angular/core/testing';

import { DulceriaApiService } from './dulceria-api.service';

describe('DulceriaApiService', () => {
  let service: DulceriaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DulceriaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
