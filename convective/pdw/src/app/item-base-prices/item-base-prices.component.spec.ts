import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ItemBasePricesComponent} from './item-base-prices.component';
import {HfcComponentsModule} from 'hfc-components/dist';
import {SharedModule} from '../shared/shared.module';
import {ItemSearchModule} from '../shared/item-search/item-search.module';
import {ApiService} from '../shared/api/api.service';
import {NavService} from '../nav.service';
import {ItemBasePricesRoutingModule} from './item-base-prices-routing.module';
import {
  ItemBasePricesSearchFormComponent
} from './item-base-prices-search-form/item-base-prices-search-form.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../auth.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ItemBasePricesComponent', () => {
  let component: ItemBasePricesComponent;
  let fixture: ComponentFixture<ItemBasePricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SharedModule,
          HfcComponentsModule.forRoot(),
          ItemBasePricesRoutingModule,
          RouterTestingModule,
          NoopAnimationsModule,
          ItemSearchModule
        ],
        declarations: [
          ItemBasePricesComponent,
          ItemBasePricesSearchFormComponent
        ],
        providers: [ApiService, NavService, AuthService]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBasePricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
