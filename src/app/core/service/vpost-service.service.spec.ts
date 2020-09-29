import { TestBed } from '@angular/core/testing';

import { VpostServiceService } from './vpost-service.service';

describe('VpostServiceService', () => {
  let service: VpostServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VpostServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
