import { TestBed } from '@angular/core/testing';

import { TalesServiceService } from './tales-service.service';

describe('TalesServiceService', () => {
  let service: TalesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
