import { TestBed } from '@angular/core/testing';

import { CorporativoApiService } from './corporativo-api.service';

describe('CorporativoApiService', () => {
  let service: CorporativoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporativoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
