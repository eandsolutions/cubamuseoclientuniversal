import { TestBed } from '@angular/core/testing';

import { SamplesServiceService } from './samples-service.service';

describe('SamplesServiceService', () => {
  let service: SamplesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamplesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
