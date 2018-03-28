import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api/api.service';
import {CustomerItemPricing} from '../models/customer-item-pricing';
import {GridConfiguration} from '../models/grid-configuration';
import {LookupFieldResult} from '../models/lookup-field-result';
import {GridConfigurationService} from '../grid/grid-configuration.service';
import {DateService} from '../shared/date.service';
import {SearchConfiguration} from '../models/search-configuration';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class CustomerItemPricingService {
  public shipLocationObservable: Observable<LookupFieldResult>;
  public priceBracketObservable: Observable<string>;
  private shipLocationObserver: Observer<LookupFieldResult>;
  private priceBracketObserver: Observer<string>;

  constructor(private apiService: ApiService,
              private gridConfigurationService: GridConfigurationService,
              private dateService: DateService) {
    this.shipLocationObservable =
      Observable.create((observer: Observer<LookupFieldResult>) => this.shipLocationObserver = observer);
    this.priceBracketObservable =
      Observable.create((observer: Observer<string>) => this.priceBracketObserver = observer);
  }

  public getCustomerItemPricing(customerId: string,
                                itemId: string,
                                effectiveDate: string,
                                shipLocationFilter?: string,
                                priceBracketFilter?: string): Observable<CustomerItemPricing> {
    let url = this.apiService.baseUrl;
    url += `/customerItemPricing&customer=${customerId}&item=${itemId}`;
    url += `&effectiveDate=${effectiveDate}`;

    if (shipLocationFilter) {
      url += `&shipLoc=${shipLocationFilter}`;
    }
    if (priceBracketFilter) {
      url += `&priceBracket=${priceBracketFilter}`;
    }

    return this.apiService.get(url).map((response: CustomerItemPricing) => {
      this.shipLocationObserver.next({
        fieldId: String(response.customerData.shipLocID),
        fieldKey: response.customerData.shipLocKey,
        fieldDescription: response.customerData.shipLocDesc,
        fieldDisplayText: `${response.customerData.shipLocKey} - ${response.customerData.shipLocDesc}`
      });
      this.priceBracketObserver.next(response.customerData.priceBracket);
      return response;
    });
  }

  public createOrUpdateUserGridConfig(defaultConfig: GridConfiguration,
                                      customer: LookupFieldResult,
                                      item: LookupFieldResult,
                                      shipLocation: LookupFieldResult,
                                      effectiveDate: Date,
                                      priceBracketId: string): Observable<GridConfiguration> {
    // Create a new default config for this user
    if (!defaultConfig.isUserDefault) {
      const newConfig = Object.assign({}, defaultConfig);
      newConfig.id = 0;
      newConfig.isDefault = true;
      newConfig.name = this.gridConfigurationService.REPORTING_USER_DEFAULT_CONFIG;
      this.updateSearchConfig(newConfig, customer, item, shipLocation, effectiveDate, priceBracketId);

      return this.gridConfigurationService.saveConfiguration(newConfig);
    } else {
      // Update the current user config to save the searchConfig
      this.updateSearchConfig(defaultConfig, customer, item, shipLocation, effectiveDate, priceBracketId);

      return this.gridConfigurationService.saveConfiguration(defaultConfig);
    }
  }

  private updateSearchConfig(config: GridConfiguration,
                             customer: LookupFieldResult,
                             item: LookupFieldResult,
                             shipLocation: LookupFieldResult,
                             effectiveDate: Date,
                             priceBracketId: string): void {
    config.activeSearch = [];
    config.activeSearch.push({
      columnName: 'effectiveDate', value: this.dateService.getLocalString(effectiveDate)
    });
    config.activeSearch.push({
      columnName: 'priceBracketId', value: priceBracketId
    });
    this.lookupFieldToSearchConfigurations('customer', customer)
      .map((searchConfig: SearchConfiguration) => {
        config.activeSearch.push(searchConfig);
      });
    if (item) {
      this.lookupFieldToSearchConfigurations('item', item)
        .map((searchConfig: SearchConfiguration) => {
          config.activeSearch.push(searchConfig);
        });
    }
    if (shipLocation) {
      this.lookupFieldToSearchConfigurations('shipLocation', shipLocation)
        .map((searchConfig: SearchConfiguration) => {
          config.activeSearch.push(searchConfig);
        });
    }
  }

  private lookupFieldToSearchConfigurations(prefix: string,
                                            lookupField: LookupFieldResult): SearchConfiguration[] {
    const searchConfigurations = [];
    searchConfigurations.push({
      columnName: `${prefix}Key`, value: lookupField.fieldKey || ''
    });
    searchConfigurations.push({
      columnName: `${prefix}Description`, value: lookupField.fieldDescription || ''
    });
    searchConfigurations.push({
      columnName: `${prefix}Id`, value: lookupField.fieldId || ''
    });
    searchConfigurations.push({
      columnName: `${prefix}DisplayText`, value: lookupField.fieldDisplayText || ''
    });
    return searchConfigurations;
  }
}
