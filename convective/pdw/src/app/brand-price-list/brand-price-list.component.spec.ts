import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrandPriceListComponent} from './brand-price-list.component';
import {HfcComponentsModule} from 'hfc-components/dist';
import {SharedModule} from '../shared/shared.module';
import {ApiService} from '../shared/api/api.service';
import {BrandPriceListRoutingModule} from './brand-price-list-routing.module';
import {NavService} from '../nav.service';
import {
  BrandPriceListSearchFormComponent
} from './brand-price-list-search-form/brand-price-list-search-form.component';
import {BrandSearchComponent} from './brand-search/brand-search.component';
import {BrandSearchFormComponent} from './brand-search/brand-search-form/brand-search-form.component';
import {BrandService} from './brand.service';
import {ItemPriceListService} from '../item-price-list/item-price-list.service';
import {
  ItemPriceListSearchFormComponent
} from '../item-price-list/item-price-list-search-form/item-price-list-search-form.component';
import {DateService} from '../shared/date.service';
import {GridModule} from '../grid/grid.module';
import {LookupService} from '../shared/lookup.service';
import {StaticLookupsService} from '../static-lookups.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../auth.service';
import {MediaService} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('BrandPriceListComponent', () => {
  let component: BrandPriceListComponent;
  let fixture: ComponentFixture<BrandPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          HfcComponentsModule.forRoot(),
          RouterTestingModule,
          BrandPriceListRoutingModule,
          NoopAnimationsModule,
          GridModule
        ],
        declarations: [
          BrandPriceListComponent,
          BrandPriceListSearchFormComponent,
          BrandSearchComponent,
          BrandSearchFormComponent,
          ItemPriceListSearchFormComponent
        ],
        providers: [
          ApiService,
          AuthService,
          BrandService,
          MediaService,
          DateService,
          ItemPriceListService,
          LookupService,
          NavService,
          StaticLookupsService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
