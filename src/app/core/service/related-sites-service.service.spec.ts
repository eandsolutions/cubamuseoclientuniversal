import { TestBed } from '@angular/core/testing';

import { RelatedSitesServiceService } from './related-sites-service.service';

describe('RelatedSitesServiceService', () => {
  let service: RelatedSitesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatedSitesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
