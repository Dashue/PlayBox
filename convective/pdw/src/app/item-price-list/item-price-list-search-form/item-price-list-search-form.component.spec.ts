import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ItemPriceListSearchFormComponent} from './item-price-list-search-form.component';
import {SharedModule} from '../../shared/shared.module';
import {StaticLookupsService} from '../../static-lookups.service';
import {ItemPriceListService} from '../item-price-list.service';
import {ApiService} from '../../shared/api/api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../../config.service';
import {ItemService} from '../../shared/item-search/item.service';
import {LookupService} from '../../shared/lookup.service';
import {GridInstanceService} from '../../grid';
import {DateService} from '../../shared/date.service';

describe('ItemPriceListSearchFormComponent', () => {
  let component: ItemPriceListSearchFormComponent;
  let fixture: ComponentFixture<ItemPriceListSearchFormComponent>;
  let httpMock: HttpTestingController;
  let itemPriceListService: ItemPriceListService;
  const mockPriceList = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemPriceListSearchFormComponent],
      imports: [
        SharedModule, HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        StaticLookupsService, ItemPriceListService, ApiService, AuthService,
        ConfigService, ItemService, LookupService, GridInstanceService, DateService
      ]
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    itemPriceListService = TestBed.get(ItemPriceListService);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPriceListSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    const req = httpMock.expectOne(itemPriceListService.priceListTypeAheadEndpoint);
    expect(req.request.method).toBe('GET');
    req.flush(mockPriceList);
  });
});
