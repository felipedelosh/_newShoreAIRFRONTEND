import { TestBed } from '@angular/core/testing';

import { GetFromAPIService } from './get-from-api.service';

describe('GetFromAPIService', () => {
  let service: GetFromAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFromAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
