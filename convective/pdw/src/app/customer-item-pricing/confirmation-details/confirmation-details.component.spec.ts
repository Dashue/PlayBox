import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationDetailsComponent} from './confirmation-details.component';
import {MdProgressSpinnerModule, MdToolbarModule} from '@angular/material';
import {CustomerConfirmationsService} from '../customer-confirmations.service';
import {NavService} from '../../nav.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiService} from '../../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../auth.service';
import {ConfigService} from '../../config.service';
// import {ConfirmationItem} from '../../models/customer-item';
// import {ActivatedRoute, convertToParamMap} from '@angular/router';
// import {Observable} from 'rxjs/Observable';

describe('ConfirmationDetailsComponent', () => {
  let component: ConfirmationDetailsComponent;
  let fixture: ComponentFixture<ConfirmationDetailsComponent>;
  let httpMock: HttpTestingController;
  let customerConfirmationsService: CustomerConfirmationsService;
  let apiService: ApiService;
  const confirmationId = '1';
  const itemKey = '2';
  const mockConfirmationItem = {
    confirmationNumber: 0,
    customerNumber: 0,
    outletNumber: 0,
    bracketAddon: false,
    startDate: new Date(),
    endDate: new Date(),
    comments: [],
    maxQuantity: 0,
    minQuantity: 0,
    orderedQty: 0,
    price: 0,
    allowance: '',
    regionApprovStat: 'APV ',
    prdmgrApprovStat: 'APV ',
    prcadmApprovStat: 'APV '
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDetailsComponent],
      imports: [
        MdToolbarModule, MdProgressSpinnerModule, RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        CustomerConfirmationsService, ApiService, AuthService, ConfigService, NavService
      ]
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    customerConfirmationsService = TestBed.get(CustomerConfirmationsService);
    apiService = TestBed.get(ApiService);
  }));

  // afterEach(() => {
  //   httpMock.verify();
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    // customerConfirmationsService.getConfirmationItemPricing(confirmationId, itemKey)
    // .subscribe((response: ConfirmationItem) => {
    //   expect(component.confirmationDetails).toBeTruthy();
    //   expect(component.requestInProgress).toBeFalsy();
    // });

    expect(component).toBeTruthy();
    // TODO: figure out how to correctly mock this.route.paramMap in combination with switchMap
    // const req = httpMock.expectOne(
    //   `${apiService.customerConfirmationsUrl}/${confirmationId}&item=${itemKey}`);
    // expect(req.request.method).toBe('GET');
    // req.flush(mockConfirmationItem);
  });
});
