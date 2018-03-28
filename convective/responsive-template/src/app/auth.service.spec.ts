import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('IsInRole', () => {
    const testRole = 'testRole';
    it('should return true when in role', inject([AuthService], (service: AuthService) => {
      expect(service.isInRole(testRole)).toBeTruthy();
    }));

    it('should return false when not in role', inject([AuthService], (service: AuthService) => {
      expect(service.isInRole(testRole)).toBeFalsy();
    }));
  });

  describe('IsInGroup', () => {
    const testGroup = 'testGroup';
    it('should return true when in group', inject([AuthService], (service: AuthService) => {
      expect(service.isInGroup(testGroup)).toBeTruthy();
    }));

    it('should return false when not in group', inject([AuthService], (service: AuthService) => {
      expect(service.isInGroup(testGroup)).toBeFalsy();
    }));
  });
});
