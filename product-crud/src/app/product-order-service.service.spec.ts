import { TestBed } from '@angular/core/testing';

import { ProductOrderServiceService } from './product-order-service.service';

describe('ProductOrderServiceService', () => {
  let service: ProductOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
