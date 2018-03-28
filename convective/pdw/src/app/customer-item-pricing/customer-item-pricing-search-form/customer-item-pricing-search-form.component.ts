import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LookupFieldResult} from '../../models/lookup-field-result';
import {Observable} from 'rxjs/Observable';
import {CustomersService} from '../customers.service';
import {ItemService} from '../../shared/item-search/item.service';
import {Router} from '@angular/router';
import {ShipLocationsService} from '../ship-locations.service';
import {PriceBracketsService} from '../price-brackets.service';
import {LookupService} from '../../shared/lookup.service';
import {CustomerItemPricingSearchFormData} from './customer-item-pricing-search-form-data';
import {StateService} from '../../shared/state.service';
import {GridConfigurationService} from '../../grid/grid-configuration.service';
import {GridConfiguration} from '../../models/grid-configuration';
import {SearchConfiguration} from '../../models/search-configuration';
import {DateService} from '../../shared/date.service';
import {CustomerItemPricingService} from '../customer-item-pricing.service';

@Component({
  selector: 'hfc-customer-item-pricing-search-form',
  templateUrl: './customer-item-pricing-search-form.component.html',
  styleUrls: ['./customer-item-pricing-search-form.component.scss']
})
export class CustomerItemPricingSearchFormComponent implements OnInit {
  @Output() formData: EventEmitter<CustomerItemPricingSearchFormData> =
    new EventEmitter<CustomerItemPricingSearchFormData>();
  public title = 'Customer Item Pricing Search';
  public form: FormGroup;
  public filteredCustomerIdOptions: Observable<LookupFieldResult[]>;
  public filteredCustomerDescriptionOptions: Observable<LookupFieldResult[]>;
  public filteredItemIdOptions: Observable<LookupFieldResult[]>;
  public filteredItemDescriptionOptions: Observable<LookupFieldResult[]>;
  public filteredShipLocationIdOptions: Observable<LookupFieldResult[]>;
  public filteredShipLocationDescriptionOptions: Observable<LookupFieldResult[]>;
  public priceBracketOptions: LookupFieldResult[];
  public searchExecuted: boolean = false;
  private userDefaultGridConfig: GridConfiguration;
  public gridConfigLoaded = false;
  public errorMessage: string;
  private shipLocationOrPriceBracketSetByGridConfig: boolean = false;

  private effectiveDateControl: FormControl = new FormControl(null, Validators.required);
  private customerKeyControl: FormControl = new FormControl('', Validators.required);
  private customerDescriptionControl: FormControl = new FormControl('', Validators.required);
  private itemKeyControl: FormControl = new FormControl(new LookupFieldResult());
  private itemDescriptionControl: FormControl = new FormControl(new LookupFieldResult());
  private shipLocationDescriptionControl: FormControl = new FormControl(new LookupFieldResult());
  private shipLocationKeyControl: FormControl = new FormControl(new LookupFieldResult());
  private priceBracketIdControl: FormControl = new FormControl('');

  private initialFormState = {
    effectiveDate: this.effectiveDateControl,
    customerKey: this.customerKeyControl,
    customerDescription: this.customerDescriptionControl,
    itemKey: this.itemKeyControl,
    itemDescription: this.itemDescriptionControl,
    shipLocationId: this.shipLocationKeyControl,
    shipLocationDescription: this.shipLocationDescriptionControl,
    priceBracketId: this.priceBracketIdControl
  };

  public get showShipLocation(): boolean {
    return this.searchExecuted || this.shipLocationOrPriceBracketSetByGridConfig;
  };

  private get formState(): CustomerItemPricingSearchFormData {
    return this.stateService.get('customer-item-price-list');
  };

  private set formState(value: CustomerItemPricingSearchFormData) {
    this.stateService.set('customer-item-price-list', value);
  };

  constructor(fb: FormBuilder,
              private router: Router,
              private itemService: ItemService,
              private customerItemPricingService: CustomerItemPricingService,
              private customerService: CustomersService,
              private shipLocationsService: ShipLocationsService,
              private priceBracketService: PriceBracketsService,
              private lookupService: LookupService,
              private stateService: StateService,
              private gridConfigurationService: GridConfigurationService,
              private dateService: DateService) {
    this.form = fb.group(this.initialFormState);
  }

  ngOnInit() {
    this.gridConfigurationService.getDefaultConfiguration('customerItemPricingGrid')
      .subscribe((config: GridConfiguration) => {
        this.userDefaultGridConfig = config;
        if (config) {
          let customer: any = undefined;
          let item: any = undefined;
          let shipLocation: any = undefined;

          config.activeSearch.map((searchConfig: SearchConfiguration) => {
            if (searchConfig.value !== undefined) {
              switch (searchConfig.columnName) {
                case 'customerKey':
                  if (!customer) {
                    customer = {};
                  }
                  customer.fieldKey = searchConfig.value;
                  break;
                case 'customerId':
                  if (!customer) {
                    customer = {};
                  }
                  customer.fieldId = searchConfig.value;
                  break;
                case 'customerDescription':
                  if (!customer) {
                    customer = {};
                  }
                  customer.fieldDescription = searchConfig.value;
                  break;
                case 'customerDisplayText':
                  if (!customer) {
                    customer = {};
                  }
                  customer.fieldDisplayText = searchConfig.value;
                  break;
                case 'itemKey':
                  if (!item) {
                    item = {};
                  }
                  item.fieldKey = searchConfig.value;
                  break;
                case 'itemId':
                  if (!item) {
                    item = {};
                  }
                  item.fieldId = searchConfig.value;
                  break;
                case 'itemDescription':
                  if (!item) {
                    item = {};
                  }
                  item.fieldDescription = searchConfig.value;
                  break;
                case 'itemDisplayText':
                  if (!item) {
                    item = {};
                  }
                  item.fieldDisplayText = searchConfig.value;
                  break;
                case 'shipLocationKey':
                  if (!shipLocation) {
                    shipLocation = {};
                    this.shipLocationOrPriceBracketSetByGridConfig = true;
                  }
                  shipLocation.fieldKey = searchConfig.value;
                  break;
                case 'shipLocationId':
                  if (!shipLocation) {
                    shipLocation = {};
                    this.shipLocationOrPriceBracketSetByGridConfig = true;
                  }
                  shipLocation.fieldId = searchConfig.value;
                  break;
                case 'shipLocationDescription':
                  if (!shipLocation) {
                    shipLocation = {};
                    this.shipLocationOrPriceBracketSetByGridConfig = true;
                  }
                  shipLocation.fieldDescription = searchConfig.value;
                  break;
                case 'shipLocationDisplayText':
                  if (!shipLocation) {
                    shipLocation = {};
                    this.shipLocationOrPriceBracketSetByGridConfig = true;
                  }
                  shipLocation.fieldDisplayText = searchConfig.value;
                  break;
                case 'effectiveDate':
                  this.effectiveDateControl.setValue(this.dateService.fromServerToLocal(searchConfig.value));
                  break;
                case 'priceBracketId':
                  this.priceBracketIdControl.setValue(searchConfig.value);
                  this.shipLocationOrPriceBracketSetByGridConfig = true;
                  break;
              }
            }
          });

          this.customerKeyControl.setValue(customer);
          this.customerDescriptionControl.setValue(customer);
          this.itemKeyControl.setValue(item);
          this.itemDescriptionControl.setValue(item);
          this.shipLocationKeyControl.setValue(shipLocation);
          this.shipLocationDescriptionControl.setValue(shipLocation);
          this.gridConfigLoaded = true;
        }

        /* Reapply state if any */
        const state = this.formState;
        if (state) {
          // Fix exception about needing to provide a value for these fields when form.setValue() is called
          if (state.priceBracketId === undefined) {
            state.priceBracketId = null;
          }
          if (state.shipLocationId === undefined) {
            state.shipLocationId = null;
          }
          if (state.shipLocationDescription === undefined) {
            state.shipLocationDescription = null;
          }
          if (state.itemKey === undefined) {
            state.itemKey = null;
          }
          if (state.itemDescription === undefined) {
            state.itemDescription = null;
          }
          this.form.setValue(state);
        }
        this.configureLookupAndRetrieveValues();
        // If returning to a previously run search, re-run that search now
        if (state) {
          this.submit();
        }
      }, (error) => {
        console.error(error);
        this.errorMessage = 'Failed to load configuration from server. Please contact an Administrator.';
      });

    this.priceBracketService.getPriceBrackets()
      .subscribe((response: LookupFieldResult[]) => {
        this.priceBracketOptions = response;
      }, (error) => {
        console.error(error);
        return [];
      });

    this.filteredCustomerIdOptions = this.customerKeyControl
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((keyFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!keyFragmentOrSelectedOption) {
          if (keyFragmentOrSelectedOption === '') {
            this.customerDescriptionControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof keyFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.customerDescriptionControl.value !== 'object') {
            this.customerDescriptionControl.setValue(keyFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.customerDescriptionControl.setValue(undefined);
          return this.customerService.searchByFieldKey(keyFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.filteredCustomerDescriptionOptions = this.customerDescriptionControl
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((descriptionFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!descriptionFragmentOrSelectedOption) {
          if (descriptionFragmentOrSelectedOption === '') {
            this.customerKeyControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof descriptionFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.customerKeyControl.value !== 'object') {
            this.customerKeyControl.setValue(descriptionFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.customerKeyControl.setValue(undefined);
          return this.customerService.searchByDescription(descriptionFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.filteredItemIdOptions = this.itemKeyControl
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((keyFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!keyFragmentOrSelectedOption) {
          if (keyFragmentOrSelectedOption === '') {
            this.itemDescriptionControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof keyFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.itemDescriptionControl.value !== 'object') {
            this.itemDescriptionControl.setValue(keyFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.itemDescriptionControl.setValue(undefined);
          return this.itemService.searchByFieldKey(keyFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.filteredItemDescriptionOptions = this.itemDescriptionControl
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((descriptionFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!descriptionFragmentOrSelectedOption) {
          if (descriptionFragmentOrSelectedOption === '') {
            this.itemKeyControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof descriptionFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.itemKeyControl.value !== 'object') {
            this.itemKeyControl.setValue(descriptionFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.itemKeyControl.setValue(undefined);
          return this.itemService.searchByDescription(descriptionFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.filteredShipLocationIdOptions = this.shipLocationKeyControl
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((keyFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!keyFragmentOrSelectedOption) {
          if (keyFragmentOrSelectedOption === '') {
            this.shipLocationDescriptionControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof keyFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.shipLocationDescriptionControl.value !== 'object') {
            this.shipLocationDescriptionControl.setValue(keyFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.shipLocationDescriptionControl.setValue(undefined);
          return this.shipLocationsService.searchByFieldKey(keyFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.filteredShipLocationDescriptionOptions = this.shipLocationDescriptionControl
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((descriptionFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!descriptionFragmentOrSelectedOption) {
          if (descriptionFragmentOrSelectedOption === '') {
            this.shipLocationKeyControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof descriptionFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.shipLocationKeyControl.value !== 'object') {
            this.shipLocationKeyControl.setValue(descriptionFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.shipLocationKeyControl.setValue(undefined);
          return this.shipLocationsService.searchByDescription(descriptionFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.customerItemPricingService.shipLocationObservable
      .subscribe((shipLocation: LookupFieldResult) => {
        this.shipLocationDescriptionControl.setValue(shipLocation);
        this.shipLocationKeyControl.setValue(shipLocation);
      });

    this.customerItemPricingService.priceBracketObservable
      .subscribe((priceBracket: string) => {
        this.priceBracketIdControl.setValue(priceBracket);
      });
  }

  customerSearch() {
    this.formState = this.form.getRawValue();
    this.router.navigate(['customer-item-pricing/customer-search']);
  }

  itemSearch() {
    this.formState = this.form.getRawValue();
    this.router.navigate(['customer-item-pricing/item-search']);
  }

  shipLocationSearch() {
    this.formState = this.form.getRawValue();
    this.router.navigate(['customer-item-pricing/ship-location-search']);
  }

  public clear() {
    this.formState = {effectiveDate: null, customerId: undefined, customerDescription: undefined};
    this.form.reset();
  }

  public submit() {
    this.validateFormAndDisplayErrors();
    if (!this.form.invalid) {
      this.searchExecuted = true;
      this.formState = this.form.getRawValue();
      this.customerItemPricingService.createOrUpdateUserGridConfig(this.userDefaultGridConfig,
        this.customerKeyControl.value, this.itemKeyControl.value, this.shipLocationKeyControl.value,
        this.effectiveDateControl.value, this.priceBracketIdControl.value)
        .subscribe((response: GridConfiguration) => {
          this.userDefaultGridConfig = response;
        }, (error) => {
          // TODO should we create a user visible error here?
          console.error(error);
        });

      this.formData.emit({
        effectiveDate: this.effectiveDateControl.value,
        customerId: (<LookupFieldResult>this.customerKeyControl.value).fieldId,
        customerDescription: (<LookupFieldResult>this.customerDescriptionControl.value).fieldDescription,
        itemId: this.itemKeyControl.value ? (<LookupFieldResult>this.itemKeyControl.value).fieldId : '',
        itemKey: this.itemKeyControl.value ? (<LookupFieldResult>this.itemKeyControl.value).fieldKey : '',
        itemDescription: this.itemDescriptionControl.value ?
          (<LookupFieldResult>this.itemDescriptionControl.value).fieldDescription : '',
        shipLocationId: this.shipLocationKeyControl.value ?
          (<LookupFieldResult>this.shipLocationKeyControl.value).fieldId : '',
        shipLocationDescription: this.shipLocationKeyControl.value ?
          (<LookupFieldResult>this.shipLocationDescriptionControl.value).fieldDescription : '',
        priceBracketId: this.priceBracketIdControl.value
      });
    }
  }

  validateFormAndDisplayErrors() {
    Object.keys(this.form.controls).map((controlName) => {
      this.form.get(controlName).markAsTouched({onlySelf: true});
    });
  }

  private configureLookupAndRetrieveValues() {
    const route = this.router.routerState.snapshot.root;
    const customer = this.lookupService.getCurrentCustomer(route);
    const product = this.lookupService.getCurrentProduct(route);
    const shipLocation = this.lookupService.getCurrentShipLocation(route);

    if (customer) {
      this.customerKeyControl.setValue(customer);
      this.customerDescriptionControl.setValue(customer);
    }

    if (product) {
      this.itemKeyControl.setValue(product);
      this.itemDescriptionControl.setValue(product);
    }

    if (shipLocation) {
      this.shipLocationDescriptionControl.setValue(shipLocation);
      this.shipLocationKeyControl.setValue(shipLocation);
    }

    this.lookupService.configure({
      currentCustomer: customer,
      currentProduct: product,
      currentShipLocation: shipLocation
    });

    if (customer || product || shipLocation) {
      this.router.navigate(['customer-item-pricing']);
    }
  }
}
