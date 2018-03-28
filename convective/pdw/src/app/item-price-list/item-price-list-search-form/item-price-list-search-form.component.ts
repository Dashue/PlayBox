import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StaticLookupsService} from '../../static-lookups.service';
import {LookupFieldResult} from '../../models/lookup-field-result';
import {ItemPriceListService} from '../item-price-list.service';
import {Observable} from 'rxjs/Observable';
import {ItemService} from '../../shared/item-search/item.service';
import {Router} from '@angular/router';
import {LookupService} from '../../shared/lookup.service';
import {StateService} from '../../shared/state.service';
import {ItemPriceListSearchParams} from '../item-price-list-search-params';
import {GridInstanceService} from '../../grid';
import {DateService} from '../../shared/date.service';

@Component({
  selector: 'hfc-item-price-list-search-form',
  templateUrl: './item-price-list-search-form.component.html',
  styleUrls: ['./item-price-list-search-form.component.scss']
})
export class ItemPriceListSearchFormComponent implements OnInit {
  @Output() formData: EventEmitter<ItemPriceListSearchParams>;
  public title = 'Item Price Search';
  public form: FormGroup;
  public priceListOptions: LookupFieldResult[];
  private initialFormState;
  public filteredItemIdOptions: Observable<LookupFieldResult[]>;
  public filteredItemDescriptionOptions: Observable<LookupFieldResult[]>;
  public isLoadingActiveSearch: boolean = true;
  public errorMessage: string;

  private itemKeyControl: FormControl = new FormControl('', Validators.required);
  private itemDescriptionControl: FormControl = new FormControl('', Validators.required);
  private priceListControl: FormControl = new FormControl('', Validators.required);
  private effectiveDateControl: FormControl = new FormControl(null, Validators.required);
  private displayControl: FormControl;

  private get formState(): ItemPriceListSearchParams {
    return this.stateService.get('item-price-list');
  };

  private set formState(value: ItemPriceListSearchParams) {
    this.stateService.set('item-price-list', value);
  };

  constructor(fb: FormBuilder,
              public staticLookupsService: StaticLookupsService,
              private itemPriceListService: ItemPriceListService,
              private router: Router,
              private itemService: ItemService,
              private lookupService: LookupService,
              private stateService: StateService,
              private gridInstanceService: GridInstanceService,
              private dateService: DateService) {
    this.formData = new EventEmitter<ItemPriceListSearchParams>();
    this.displayControl = new FormControl(this.staticLookupsService.itemPriceListDisplayOptions[0].value,
      Validators.required);

    this.initialFormState = {
      itemKey: this.itemKeyControl,
      itemDescription: this.itemDescriptionControl,
      effectiveDate: this.effectiveDateControl,
      priceList: this.priceListControl,
      display: this.displayControl
    };
    this.form = fb.group(this.initialFormState);
  }

  ngOnInit() {
    this.itemPriceListService.getData().subscribe(response => {
      this.priceListOptions = response;
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

    this.isLoadingActiveSearch = true;
    this.gridInstanceService.SearchConfigurationChanged
      .subscribe((data: ItemPriceListSearchParams) => {
        this.form.reset();
        this.applyFormState();
        if (data.itemKey !== null && data.itemKey !== undefined) {
          this.itemService.searchByFieldKey(data.itemKey).subscribe((item: LookupFieldResult[]) => {
              this.itemKeyControl.setValue(item[0]);
              this.itemDescriptionControl.setValue(item[0]);
              this.displayControl.setValue(data.displayType);
              this.effectiveDateControl.setValue(data.effectiveDate ?
                this.dateService.fromServerToLocal(data.effectiveDate) : null);
              this.priceListControl.setValue(data.priceListId);
              this.isLoadingActiveSearch = false;
              this.configureLookupAndRetrieveValues();
            }
          );
        } else {
          this.isLoadingActiveSearch = false;
          this.configureLookupAndRetrieveValues();
        }
      }, (error) => {
        this.errorMessage = error;
        this.applyFormState();
        this.isLoadingActiveSearch = false;
        this.configureLookupAndRetrieveValues();
      });
  }

  applyFormState() {
    /* Reapply state if any */
    const state = this.formState;
    if (state) {
      this.form.setValue(state);
    }
  }

  itemSearch() {
    this.formState = this.form.getRawValue();
    this.router.navigate(['item-price-list/item-search']);
  }

  public clear() {
    this.formState = {
      itemId: null,
      itemKey: null,
      priceListId: null,
      effectiveDate: null,
      displayType: null
    };
    this.form.reset();
  }

  public submit() {
    this.validateFormAndDisplayErrors();
    if (!this.form.invalid) {

      const search: ItemPriceListSearchParams = {
        itemId: (<LookupFieldResult>this.itemKeyControl.value).fieldId,
        priceListId: this.priceListControl.value,
        effectiveDate: this.dateService.getLocalString(this.effectiveDateControl.value),
        displayType: this.displayControl.value,
        itemKey: (<LookupFieldResult>this.itemKeyControl.value).fieldKey
      };

      this.formData.emit(search);
    }
  }

  validateFormAndDisplayErrors() {
    Object.keys(this.form.controls).map((controlName) => {
      this.form.get(controlName).markAsTouched({onlySelf: true});
    });
  }

  private configureLookupAndRetrieveValues() {
    const productItem = this.lookupService.getCurrentProduct(this.router.routerState.snapshot.root);
    if (productItem) {
      this.itemKeyControl.setValue(productItem);
      this.itemDescriptionControl.setValue(productItem);
    }

    this.lookupService.configure({
      currentProduct: productItem
    });
  }
}
