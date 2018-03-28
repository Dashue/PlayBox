import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HelpComponent} from './help.component';
import {MdCardModule, MdProgressSpinnerModule} from '@angular/material';
import {AuthService} from '../auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from '../config.service';
import {NavService} from '../nav.service';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HelpComponent],
        imports: [
          MdProgressSpinnerModule, MdCardModule, RouterTestingModule, HttpClientTestingModule
        ],
        providers: [
          AuthService, ConfigService, NavService
        ]
      }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
