import { TestBed } from '@angular/core/testing';

import { PromocionesApiService } from './promociones-api.service';

describe('PromocionesApiService', () => {
  let service: PromocionesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromocionesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
