import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SoldItemListComponent} from './sold-item-list.component';
import {CustomerItemsSoldService} from '../customer-items-sold.service';
import {MdListModule, MdProgressSpinnerModule} from '@angular/material';
import {ApiService} from '../../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../../config.service';

describe('SoldItemListComponent', () => {
  let component: SoldItemListComponent;
  let fixture: ComponentFixture<SoldItemListComponent>;
  let httpMock: HttpTestingController;
  let customerItemsSoldService: CustomerItemsSoldService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SoldItemListComponent],
      imports: [
        MdListModule, MdProgressSpinnerModule, HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        CustomerItemsSoldService, ApiService, AuthService, ConfigService
      ]
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    customerItemsSoldService = TestBed.get(CustomerItemsSoldService);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
