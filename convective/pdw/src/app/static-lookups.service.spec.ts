import {inject, TestBed} from '@angular/core/testing';

import {StaticLookupsService} from './static-lookups.service';

describe('StaticLookupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticLookupsService]
    });
  });

  it('should be created', inject([StaticLookupsService], (service: StaticLookupsService) => {
    expect(service).toBeTruthy();
  }));
});
