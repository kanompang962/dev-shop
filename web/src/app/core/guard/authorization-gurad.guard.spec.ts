import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authorizationGuradGuard } from './authorization-gurad.guard';

describe('authorizationGuradGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authorizationGuradGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
