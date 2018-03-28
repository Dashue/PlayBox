import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {ItemResponse} from './item-search/item.service';
import {Brand, Customer, LookupFieldResult, ShipLocation} from '../models';

@Injectable()
export class LookupService {
  private brand: LookupFieldResult;
  private customer: LookupFieldResult;
  private product: LookupFieldResult;
  private shipLocation: LookupFieldResult;

  constructor(private router: Router) {
  }

  public configure(items: {
    currentBrand?: LookupFieldResult,
    currentCustomer?: LookupFieldResult,
    currentProduct?: LookupFieldResult
    currentShipLocation?: LookupFieldResult
  }) {
    this.brand = items.currentBrand;
    this.customer = items.currentCustomer;
    this.product = items.currentProduct;
    this.shipLocation = items.currentShipLocation;
  }

  public complete() {
    const parentUrl = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
    const redirectUrl = parentUrl + this.buildQueryParams();
    this.router.navigateByUrl(redirectUrl);
  }

  public getCurrentCustomer(route: ActivatedRouteSnapshot): LookupFieldResult {
    if (this.customer && route.queryParamMap.has('hasCustomer')) {
      return this.customer;
    }

    return;
  }

  public setCurrentCustomer(customer: Customer) {
    this.customer = {
      fieldDescription: customer.name,
      fieldDisplayText: customer.name,
      fieldId: customer.mrCustomerId.toString(),
      fieldKey: customer.customerNumber
    };
  }

  public getCurrentProduct(route: ActivatedRouteSnapshot): LookupFieldResult {
    if (this.product && route.queryParamMap.has('hasProduct')) {
      return this.product;
    }

    return;
  }

  public setCurrentProduct(item: ItemResponse) {
    this.product = {
      fieldDescription: item.description,
      fieldDisplayText: item.description,
      fieldId: item.mrProductMasterId.toString(),
      fieldKey: item.productId
    };
  }

  public getCurrentBrand(route: ActivatedRouteSnapshot): LookupFieldResult {
    if (this.brand && route.queryParamMap.has('hasBrand')) {
      return this.brand;
    }

    return;
  }

  public setCurrentBrand(item: Brand) {
    this.brand = {
      fieldDescription: item.description,
      fieldDisplayText: item.description,
      fieldId: item.saBrandId,
      fieldKey: item.brandId
    };
  }

  public getCurrentShipLocation(route: ActivatedRouteSnapshot): LookupFieldResult {
    if (this.shipLocation && route.queryParamMap.has('hasShipLocation')) {
      return this.shipLocation;
    }

    return;
  }

  public setCurrentShipLocation(item: ShipLocation) {
    this.shipLocation = {
      fieldDescription: item.plantName,
      fieldDisplayText: `${item.plantNumber} - ${item.plantName}`,
      fieldId: item.ghPlantsId.toString(),
      fieldKey: item.plantNumber
    };
  }

  private buildQueryParams(): string {
    const params = [];

    if (this.brand) {
      params.push('hasBrand=true');
    }

    if (this.customer) {
      params.push('hasCustomer=true');
    }

    if (this.product) {
      params.push('hasProduct=true');
    }

    if (this.shipLocation) {
      params.push('hasShipLocation=true');
    }

    if (params.length > 0) {
      return '?' + params.join('&');
    }

    return '';
  }
}
