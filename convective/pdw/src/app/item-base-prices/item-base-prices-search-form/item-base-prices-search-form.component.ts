import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SearchPanelContent} from 'hfc-components/dist';
import {LookupFieldResult} from '../../models/lookup-field-result';
import {ItemService} from '../../shared/item-search/item.service';

@Component({
  selector: 'hfc-item-base-prices-search-form',
  templateUrl: './item-base-prices-search-form.component.html',
  styleUrls: ['./item-base-prices-search-form.component.scss']
})
export class ItemBasePricesSearchFormComponent implements OnInit, SearchPanelContent {
  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  public title = 'Search Item Base Prices';
  public form: FormGroup;
  private initialFormState;
  public filteredItemIdOptions: Observable<LookupFieldResult[]>;
  public filteredItemDescriptionOptions: Observable<LookupFieldResult[]>;

  constructor(fb: FormBuilder,
              private router: Router,
              private itemService: ItemService) {
    this.initialFormState = {
      itemKey: ['', [Validators.required]],
      itemDescription: ['', [Validators.required]],
      effectiveDate: [null, [Validators.required]],
    };
    this.form = fb.group(this.initialFormState);
  }

  ngOnInit() {
    this.filteredItemIdOptions = this.form.get('itemKey')
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(null)
      .flatMap((keyFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!keyFragmentOrSelectedOption) {
          if (keyFragmentOrSelectedOption === '') {
            this.form.get('itemDescription').setValue('');
          }
          return Observable.of([]);
        } else if (typeof keyFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.form.get('itemDescription').value !== 'object') {
            this.form.get('itemDescription').setValue(keyFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.form.get('itemDescription').setValue('');
          return this.itemService.searchByFieldKey(keyFragmentOrSelectedOption)
            .catch(e => {console.error(e); return []});
        }
      });

    this.filteredItemDescriptionOptions = this.form.get('itemDescription')
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(null)
      .flatMap((descriptionFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!descriptionFragmentOrSelectedOption) {
          if (descriptionFragmentOrSelectedOption === '') {
            this.form.get('itemKey').setValue('');
          }
          return Observable.of([]);
        } else if (typeof descriptionFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.form.get('itemKey').value !== 'object') {
            this.form.get('itemKey').setValue(descriptionFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.form.get('itemKey').setValue('');
          return this.itemService.searchByDescription(descriptionFragmentOrSelectedOption)
            .catch(e => {console.error(e); return []});
        }
      });
  }

  itemSearch() {
    this.router.navigate(['item-base-prices/item-search']);
  }

  public clear() {
    this.form.setValue(this.initialFormState);
    this.formData.emit(this.initialFormState);
  }

  public submit() {
    this.validateFormAndDisplayErrors();
    if (!this.form.invalid) {
      this.formData.emit(this.form.getRawValue());
    }
  }

  validateFormAndDisplayErrors() {
    Object.keys(this.form.controls).map((controlName) => {
      this.form.get(controlName).markAsTouched({onlySelf: true});
    });
  }
}
