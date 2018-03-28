import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SearchPanelContent} from 'hfc-components/dist';
import {BrandService} from '../brand.service';
import {ItemPriceListService} from '../../item-price-list/item-price-list.service';
import {LookupFieldResult} from '../../models/lookup-field-result';
import {LookupService} from '../../shared/lookup.service';
import {StateService} from '../../shared/state.service';
import {GridInstanceService} from '../../grid';
import {BrandPriceListSearchParams} from '../brand-price-list-search-params';
import {DateService} from '../../shared/date.service';
import {StaticLookupsService} from '../../static-lookups.service';

@Component({
  selector: 'hfc-brand-price-list-search-form',
  templateUrl: './brand-price-list-search-form.component.html',
  styleUrls: ['./brand-price-list-search-form.component.scss']
})
export class BrandPriceListSearchFormComponent implements OnInit, SearchPanelContent {
  @Output() formData: EventEmitter<BrandPriceListSearchParams> =
    new EventEmitter<BrandPriceListSearchParams>();
  public title = 'Brand Price Search';
  public idFilteredOptions: Observable<LookupFieldResult[]>;
  public descriptionFilteredOptions: Observable<LookupFieldResult[]>;
  public priceListOptions: LookupFieldResult[];
  public form: FormGroup;
  public isLoadingActiveSearch: boolean = true;
  public errorMessage: string;
  public displayOptions;

  private brandKeyControl = new FormControl('', Validators.required);
  private brandDescriptionControl = new FormControl('', Validators.required);
  private effectiveDateControl = new FormControl(null, Validators.required);
  private priceListControl = new FormControl('', Validators.required);
  private displayTypeControl: FormControl;

  private get formState(): BrandPriceListSearchParams {
    return this.stateService.get('brand-price-list');
  };

  private set formState(value: BrandPriceListSearchParams) {
    this.stateService.set('brand-price-list', value);
  };

  constructor(private brandService: BrandService,
              fb: FormBuilder,
              private router: Router,
              private priceListService: ItemPriceListService,
              private lookupService: LookupService,
              private stateService: StateService,
              private gridInstanceService: GridInstanceService,
              private dateService: DateService,
              staticLookupsService: StaticLookupsService) {
    this.displayOptions = staticLookupsService.brandPriceListDisplayOptions;
    this.displayTypeControl = new FormControl(this.displayOptions[0].value, Validators.required);
    this.form = fb.group({
      brandKey: this.brandKeyControl,
      brandDescription: this.brandDescriptionControl,
      effectiveDate: this.effectiveDateControl,
      priceListId: this.priceListControl,
      displayType: this.displayTypeControl
    });
  }

  ngOnInit() {
    this.priceListService.getData().subscribe(response => {
      this.priceListOptions = response;
    });

    this.idFilteredOptions = this.brandKeyControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((keyFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!keyFragmentOrSelectedOption) {
          if (keyFragmentOrSelectedOption === '') {
            this.brandDescriptionControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof keyFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.brandDescriptionControl.value !== 'object') {
            this.brandDescriptionControl.setValue(keyFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.brandDescriptionControl.setValue(undefined);
          return this.brandService.searchByFieldKey(keyFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.descriptionFilteredOptions = this.brandDescriptionControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((descriptionFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!descriptionFragmentOrSelectedOption) {
          if (descriptionFragmentOrSelectedOption === '') {
            this.brandKeyControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof descriptionFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.brandKeyControl.value !== 'object') {
            this.brandKeyControl.setValue(descriptionFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.brandKeyControl.setValue(undefined);
          return this.brandService.searchByDescription(descriptionFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.isLoadingActiveSearch = true;
    this.gridInstanceService.SearchConfigurationChanged
      .subscribe((data: BrandPriceListSearchParams) => {
        this.form.reset();
        this.applyFormState();
        if (data.brandKey !== null && data.brandKey !== undefined) {
          this.brandService.searchByFieldKey(data.brandKey).subscribe((item: LookupFieldResult[]) => {
            this.brandKeyControl.setValue(item[0]);
            this.brandDescriptionControl.setValue(item[0]);
            this.displayTypeControl.setValue(data.displayType);
            this.effectiveDateControl.setValue(data.effectiveDate ?
              this.dateService.fromServerToLocal(data.effectiveDate) : null);
            this.priceListControl.setValue(data.priceListId);
            this.isLoadingActiveSearch = false;
            this.configureLookupAndRetrieveValues();
          });
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

  brandSearch() {
    this.formState = this.form.getRawValue();
    this.router.navigate(['brand-price-list/brand-search']);
  }

  clear() {
    this.formState = {
      brandId: null,
      brandKey: null,
      priceListId: null,
      effectiveDate: null,
      displayType: null
    };
    this.form.reset();
  }

  submit() {
    this.validateFormAndDisplayErrors();
    if (this.form.invalid) {
      return;
    }

    const query: BrandPriceListSearchParams = {
      brandId: (<LookupFieldResult>this.brandKeyControl.value).fieldId,
      brandKey: (<LookupFieldResult>this.brandKeyControl.value).fieldKey,
      displayType: this.displayTypeControl.value,
      effectiveDate: this.dateService.getLocalString(this.effectiveDateControl.value),
      priceListId: this.priceListControl.value,
    };

    this.formData.emit(query);
  }

  validateFormAndDisplayErrors() {
    Object.keys(this.form.controls).map((controlName) => {
      this.form.get(controlName).markAsTouched({onlySelf: true});
    });
  }

  private configureLookupAndRetrieveValues() {
    const brandItem = this.lookupService.getCurrentBrand(this.router.routerState.snapshot.root);
    if (brandItem) {
      this.brandKeyControl.setValue(brandItem);
      this.brandDescriptionControl.setValue(brandItem);
    }

    this.lookupService.configure({
      currentBrand: brandItem
    });
  }
}
