import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {SearchPanelContent} from 'hfc-components/dist';
import {LookupFieldResult} from '../../../models';
import {BrandSearchFormData} from './brand-search-form-data';
import {GridInstanceService} from '../../../grid';
import {BrandSearchParams} from '../../brand.service';

@Component({
  selector: 'hfc-brand-search-form',
  templateUrl: './brand-search-form.component.html',
  styleUrls: ['./brand-search-form.component.scss']
})
export class BrandSearchFormComponent implements OnInit, SearchPanelContent {
  @Output() formData: EventEmitter<BrandSearchFormData> = new EventEmitter<BrandSearchFormData>();
  public title = 'Search Brands';
  public form: FormGroup;
  public gridConfigLoaded = false;
  public errorMessage: string;

  public idFilteredOptions: Observable<LookupFieldResult[]>;
  public descriptionFilteredOptions: Observable<LookupFieldResult[]>;

  public brandControl = new FormControl('');
  public descriptionControl = new FormControl('');
  public requestedByControl = new FormControl('');

  constructor(fb: FormBuilder, private gridInstanceService: GridInstanceService) {
    this.form = fb.group({
      brandKey: this.brandControl,
      brandDescription: this.descriptionControl,
      requestedBy: this.requestedByControl
    });
  }

  ngOnInit() {
    this.gridInstanceService.SearchConfigurationChanged
    .subscribe((data: BrandSearchParams) => {
      this.clear();
      this.brandControl.setValue(data.brandId ? String(data.brandId) : '');
      this.descriptionControl.setValue(data.brandDescription);
      this.requestedByControl.setValue(data.requestedBy);
      this.gridConfigLoaded = true;
      }, (error) => {
        this.errorMessage = error;
    });

  }

  submit() {
    this.formData.emit({
      brandId: this.brandControl.value,
      brandDescription: this.descriptionControl.value,
      requestedBy: this.requestedByControl.value
    });
  }

  clear() {
    this.form.reset();
  }
}
