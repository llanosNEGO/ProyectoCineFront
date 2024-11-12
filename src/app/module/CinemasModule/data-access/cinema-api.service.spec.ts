import { TestBed } from '@angular/core/testing';

import { CinemaApiService } from './cinema-api.service';

describe('CinemaApiService', () => {
  let service: CinemaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
