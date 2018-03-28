import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MenuItemComponent} from './menu-item.component';
import {MdIconModule, MdProgressSpinnerModule} from '@angular/material';
import {NavService} from '../nav.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigService} from '../config.service';
import {AuthService} from '../auth.service';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [MenuItemComponent],
        imports: [
          MdIconModule, MdProgressSpinnerModule,
          RouterTestingModule
        ],
        providers: [
          NavService,
          ConfigService,
          AuthService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    component.item = {
      name: 'Customer Item Pricing',
      iconName: 'group',
      requiredRoles: ['OPPDW_CUSTOMER_ITEM_PRICING_LOOKUP'],
      route: '/customer-item-pricing',
      children: []
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});



