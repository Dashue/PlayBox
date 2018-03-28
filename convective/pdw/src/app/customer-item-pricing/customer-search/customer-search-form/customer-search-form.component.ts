import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LookupFieldResult} from '../../../models/lookup-field-result';
import {Observable} from 'rxjs/Observable';
import {PriceBracketsService} from '../../price-brackets.service';
import {ItemPriceListService} from '../../../item-price-list/item-price-list.service';
import {StaticLookupsService} from '../../../static-lookups.service';
import {CustomerSearchFormData} from './customer-search-form-data';
import {GridInstanceService} from '../../../grid/grid-instance.service';
import {CustomersSearchParams} from '../../customers.service';

@Component({
  selector: 'hfc-customer-search-form',
  templateUrl: './customer-search-form.component.html',
  styleUrls: ['./customer-search-form.component.scss']
})
export class CustomerSearchFormComponent implements OnInit {
  @Output() formData: EventEmitter<CustomerSearchFormData> = new EventEmitter<CustomerSearchFormData>();
  public title = 'Search Customers';
  public form: FormGroup;
  public filteredCustomerIdOptions: Observable<LookupFieldResult[]>;
  public filteredCustomerDescriptionOptions: Observable<LookupFieldResult[]>;
  public priceBracketOptions: LookupFieldResult[];
  public priceListOptions: LookupFieldResult[];
  public stateOptions: {value: string, text: string}[];
  public gridConfigLoaded = false;
  public errorMessage: string;

  private bracketIdControl = new FormControl('');
  private cityControl = new FormControl('');
  private customerNumberControl = new FormControl('');
  private customerNameControl = new FormControl('');
  private outletDescriptionControl = new FormControl('');
  private outletIdControl = new FormControl('');
  private priceListIdControl = new FormControl('');
  private stateControl = new FormControl('');
  private zipCodeControl = new FormControl('');

  constructor(fb: FormBuilder,
              private priceBracketService: PriceBracketsService,
              private priceListService: ItemPriceListService,
              staticLookupService: StaticLookupsService,
              private gridInstanceService: GridInstanceService) {
    this.stateOptions = staticLookupService.stateOptions;
    this.form = fb.group({
      bracketId: this.bracketIdControl,
      city: this.cityControl,
      customerNumber: this.customerNumberControl,
      customerName: this.customerNameControl,
      outletDescription: this.outletDescriptionControl,
      outletId: this.outletIdControl,
      priceListId: this.priceListIdControl,
      state: this.stateControl,
      zipCode: this.zipCodeControl
    });
  }

  ngOnInit() {
    this.priceListService.getData().subscribe(response => {
      this.priceListOptions = response;
    });

    this.priceBracketService.getPriceBrackets()
      .subscribe((response: LookupFieldResult[]) => {
        this.priceBracketOptions = response;
      }, (error) => {
        console.error(error);
        return [];
      });

    this.gridInstanceService.SearchConfigurationChanged
      .subscribe((data: CustomersSearchParams) => {
        this.clear();
        this.customerNumberControl.setValue(data.customerNumber ? String(data.customerNumber) : '');
        this.customerNameControl.setValue(data.customerName);
        this.bracketIdControl.setValue(data.bracketId);
        this.priceListIdControl.setValue(data.priceListId);
        this.zipCodeControl.setValue(data.zipCode);
        this.stateControl.setValue(data.state);
        this.cityControl.setValue(data.city);
        this.outletIdControl.setValue(data.outletNumber ? String(data.outletNumber) : '');
        this.outletDescriptionControl.setValue(data.outletName);
        this.gridConfigLoaded = true;
      }, (error) => {
        this.errorMessage = error;
      });
  }

  public clear() {
    this.form.reset();
  }

  public submit() {
    this.formData.emit(this.form.getRawValue());
  }
}
