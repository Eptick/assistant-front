import { TestBed } from '@angular/core/testing';

import { OccupationsResourceService } from './occupations-resource.service';

describe('OccupationsResourceService', () => {
  let service: OccupationsResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupationsResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
