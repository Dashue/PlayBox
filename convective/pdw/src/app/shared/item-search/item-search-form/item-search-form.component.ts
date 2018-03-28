import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {StaticLookupsService} from '../../../static-lookups.service';
import {Observable} from 'rxjs/Observable';
import {LookupFieldResult} from '../../../models/lookup-field-result';
import {ItemSearchFormData} from './item-search-form-data';
import {ItemSearchParams} from '../item.service';
import {GridInstanceService} from '../../../grid';

@Component({
  selector: 'hfc-item-search-form',
  templateUrl: './item-search-form.component.html',
  styleUrls: ['./item-search-form.component.scss']
})
export class ItemSearchFormComponent implements OnInit {
  @Output() formData: EventEmitter<ItemSearchFormData> = new EventEmitter<ItemSearchFormData>();
  public title = 'Search Items';
  public form: FormGroup;
  public filteredItemIdOptions: Observable<LookupFieldResult[]>;
  public filteredItemDescriptionOptions: Observable<LookupFieldResult[]>;
  public gridConfigLoaded = false;
  public errorMessage: string;

  private itemIdControl = new FormControl('');
  private descriptionControl = new FormControl('');
  private orderableControl = new FormControl('');
  private pricingControl = new FormControl('');
  private statusControl = new FormControl('');

  constructor(fb: FormBuilder,
              public staticLookupsService: StaticLookupsService,
              private gridInstanceService: GridInstanceService) {
    this.form = fb.group({
      itemKey: this.itemIdControl,
      itemDescription: this.descriptionControl,
      orderable: this.orderableControl,
      pricing: this.pricingControl,
      status: this.statusControl
    });
  }

  ngOnInit() {
    this.gridInstanceService.SearchConfigurationChanged
      .subscribe((data: ItemSearchParams) => {
        this.clear();
        this.itemIdControl.setValue(data.productId ? String(data.productId) : '');
        this.descriptionControl.setValue(data.itemDescription);
        this.orderableControl.setValue(data.orderableItem);
        this.pricingControl.setValue(data.pricingUnit);
        this.statusControl.setValue(data.status);
        this.gridConfigLoaded = true;
      }, (error) => {
        this.errorMessage = error;
      });
  }

  public clear() {
    this.form.reset();
  }

  public submit() {
    this.validateFormAndDisplayErrors();
    if (!this.form.invalid) {
      this.formData.emit({
        itemId: this.itemIdControl.value,
        itemDescription: this.descriptionControl.value,
        orderable: this.orderableControl.value,
        pricingUnit: this.pricingControl.value,
        status: this.statusControl.value,
      });
    }
  }

  validateFormAndDisplayErrors() {
    Object.keys(this.form.controls).map((controlName) => {
      this.form.get(controlName).markAsTouched({onlySelf: true});
    });
  }
}
