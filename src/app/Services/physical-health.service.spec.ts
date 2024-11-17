import { TestBed } from '@angular/core/testing';

import { PhysicalHealthService } from './physical-health.service';

describe('PhysicalHealthService', () => {
  let service: PhysicalHealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalHealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
