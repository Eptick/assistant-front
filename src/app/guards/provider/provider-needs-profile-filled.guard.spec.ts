import { TestBed } from '@angular/core/testing';

import { ProviderNeedsProfileFilledGuard } from './provider-needs-profile-filled.guard';

describe('ProviderNeedsProfileFilledGuard', () => {
  let guard: ProviderNeedsProfileFilledGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProviderNeedsProfileFilledGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
