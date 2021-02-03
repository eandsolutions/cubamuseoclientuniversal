import { TestBed } from '@angular/core/testing';

import { Visit.ServiceService } from './visit.service.service';

describe('Visit.ServiceService', () => {
  let service: Visit.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Visit.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
