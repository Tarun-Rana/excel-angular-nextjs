import { TestBed } from '@angular/core/testing';

import { ExcelConversionService } from './excel-conversion.service';

describe('ExcelConversionService', () => {
  let service: ExcelConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
