import { TestBed } from '@angular/core/testing';

import { StateCartService } from './state-cart.service';

describe('StateCartService', () => {
  let service: StateCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
