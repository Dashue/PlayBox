import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomerItemReportComponent} from './customer-item-report.component';
import {MdCardModule, MdProgressSpinnerModule} from '@angular/material';
import {CustomerItemPricingService} from '../customer-item-pricing.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiService} from '../../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../auth.service';
import {ConfigService} from '../../config.service';
import {GridConfigurationService} from '../../grid/grid-configuration.service';
import {DateService} from '../../shared/date.service';

describe('CustomerItemReportComponent', () => {
  let component: CustomerItemReportComponent;
  let fixture: ComponentFixture<CustomerItemReportComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerItemReportComponent],
      imports: [
        MdCardModule, MdProgressSpinnerModule, RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        CustomerItemPricingService, ApiService, AuthService, ConfigService,
        GridConfigurationService, DateService
      ]
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerItemReportComponent);
    component = fixture.componentInstance;
    // TODO: set the component's inputs here
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
