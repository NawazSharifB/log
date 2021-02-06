import { TestBed } from '@angular/core/testing';

import { FullInfoService } from './full-info.service';

describe('FullInfoService', () => {
  let service: FullInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
