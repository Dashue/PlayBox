import {inject, TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {ConfigService} from './config.service';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {User} from './models/user';

describe('AuthService', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;
  const mockCredentials = {
    'appname': 'OPPDW',
    'userID': 'Jeff',
    'password': 'password'
  };
  const mockUserWithRoles = {
    apikey: '',
    created: '',
    email: 'john.doe@hormel.com',
    firstName: 'John',
    groups: ['IT_ADMIN'],
    lastaccess: '',
    lastName: 'Doe',
    roles: ['OPPDW_BRAND_PRICE_LIST_LOOKUP', 'OPPDW_CUSTOMER_ITEM_PRICING_LOOKUP'],
    userID: 0,
    userStatus: 'ACTIVE',
    userName: 'john.doe'
  };
  const mockUserWithOutRoles = {
    apikey: '',
    created: '',
    email: 'john.doe@hormel.com',
    firstName: 'John',
    groups: [],
    lastaccess: '',
    lastName: 'Doe',
    roles: [],
    userID: 0,
    userStatus: 'ACTIVE',
    userName: 'john.doe'
  };
  const testRole = 'OPPDW_CUSTOMER_ITEM_PRICING_LOOKUP';
  const testGroup = 'IT_ADMIN';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        ConfigService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: []
    });
    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);

    authService.login(mockCredentials.appname, mockCredentials.userID, mockCredentials.password)
      .subscribe((user: User) => {
        expect(user).toBeTruthy();
        authService.setLoggedInUser(user);
      });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
    const req = httpMock.expectOne(authService.authEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(mockUserWithRoles);
  }));

  describe('IsInRole', () => {
    it('should return true when in role', inject([AuthService], (service: AuthService) => {
      const req = httpMock.expectOne(authService.authEndpoint);
      expect(req.request.method).toBe('POST');
      req.flush(mockUserWithRoles);
      expect(service.isInRole(testRole)).toBeTruthy();
    }));

    it('should return false when not in role', inject([AuthService], (service: AuthService) => {
      const req = httpMock.expectOne(authService.authEndpoint);
      expect(req.request.method).toBe('POST');
      req.flush(mockUserWithOutRoles);
      expect(service.isInRole(testRole)).toBeFalsy();
    }));
  });

  describe('IsInGroup', () => {
    it('should return true when in group', inject([AuthService], (service: AuthService) => {
      const req = httpMock.expectOne(authService.authEndpoint);
      expect(req.request.method).toBe('POST');
      req.flush(mockUserWithRoles);
      expect(service.isInGroup(testGroup)).toBeTruthy();
    }));

    it('should return false when not in group', inject([AuthService], (service: AuthService) => {
      const req = httpMock.expectOne(authService.authEndpoint);
      expect(req.request.method).toBe('POST');
      req.flush(mockUserWithOutRoles);
      expect(service.isInGroup(testGroup)).toBeFalsy();
    }));
  });
});
