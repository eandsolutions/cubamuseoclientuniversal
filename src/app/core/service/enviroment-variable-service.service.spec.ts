import { TestBed } from '@angular/core/testing';

import { EnviromentVariableServiceService } from './enviroment-variable-service.service';

describe('EnviromentVariableServiceService', () => {
  let service: EnviromentVariableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviromentVariableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
