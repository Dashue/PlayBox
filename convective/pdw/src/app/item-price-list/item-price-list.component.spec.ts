import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ItemPriceListComponent} from './item-price-list.component';
import {HfcComponentsModule} from 'hfc-components/dist';
import {SharedModule} from '../shared/shared.module';
import {ItemPriceListRoutingModule} from './item-price-list-routing.module';
import {ItemPriceListService} from './item-price-list.service';
import {ApiService} from '../shared/api/api.service';
import {StaticLookupsService} from '../static-lookups.service';
import {
  ItemPriceListSearchFormComponent
} from './item-price-list-search-form/item-price-list-search-form.component';
import {ItemSearchModule} from '../shared/item-search/item-search.module';
import {DateService} from '../shared/date.service';
import {GridModule} from '../grid/grid.module';
import {NavService} from '../nav.service';
import {RouterTestingModule} from '@angular/router/testing';
import {MediaService} from '@angular/flex-layout';
import {AuthService} from '../auth.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ItemPriceListComponent', () => {
  let component: ItemPriceListComponent;
  let fixture: ComponentFixture<ItemPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HfcComponentsModule.forRoot(),
        ItemPriceListRoutingModule,
        RouterTestingModule,
        ItemSearchModule,
        NoopAnimationsModule,
        GridModule
      ],
      declarations: [
        ItemPriceListComponent,
        ItemPriceListSearchFormComponent
      ],
      providers: [
        ApiService,
        NavService,
        AuthService,
        MediaService,
        ItemPriceListService,
        StaticLookupsService,
        DateService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
