import { TestBed, inject } from '@angular/core/testing';

import { GridComponentService } from './grid-component.service';

describe('GridComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridComponentService]
    });
  });

  it('should be created', inject([GridComponentService], (service: GridComponentService) => {
    expect(service).toBeTruthy();
  }));
});
