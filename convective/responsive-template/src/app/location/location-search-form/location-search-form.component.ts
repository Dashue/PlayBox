import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StaticLookupsService} from '../../static-lookups.service';
import {LookupFieldResult} from '../../models/lookup-field-result';
import {LocationService} from '../location.service';
import {Observable} from 'rxjs/Observable';
import {LocationSearchParams} from '../location-search-params';
import {GridInstanceService} from '../../grid';
import {DateService} from '../../shared/date.service';

@Component({
  selector: 'hfc-location-search-form',
  templateUrl: './location-search-form.component.html',
  styleUrls: ['./location-search-form.component.scss']
})
export class LocationSearchFormComponent implements OnInit {
  @Output() formData: EventEmitter<LocationSearchParams>;
  public title = 'Location Search';
  public form: FormGroup;

  public filteredKeyOptions: Observable<LookupFieldResult[]>;
  public filteredDescriptionOptions: Observable<LookupFieldResult[]>;
  public isLoadingActiveSearch: boolean = true;
  public errorMessage: string;

  private keyControl: FormControl = new FormControl('');
  private descriptionControl: FormControl = new FormControl('');
  private effectiveDateControl: FormControl = new FormControl(null);
  private statusControl: FormControl = new FormControl(
    this.staticLookupsService.statusOptions[0].value, Validators.required);

  constructor(fb: FormBuilder,
              public staticLookupsService: StaticLookupsService,
              private locationService: LocationService,
              private gridInstanceService: GridInstanceService,
              private dateService: DateService) {
    this.formData = new EventEmitter<LocationSearchParams>();

    this.form = fb.group({
      key: this.keyControl,
      description: this.descriptionControl,
      effectiveDate: this.effectiveDateControl,
      status: this.statusControl,
    });
  }

  ngOnInit() {
    this.filteredKeyOptions = this.keyControl
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((keyFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!keyFragmentOrSelectedOption) {
          if (keyFragmentOrSelectedOption === '') {
            this.descriptionControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof keyFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.descriptionControl.value !== 'object') {
            this.descriptionControl.setValue(keyFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.descriptionControl.setValue(undefined);
          return this.locationService.searchByKey(keyFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.filteredDescriptionOptions = this.descriptionControl
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .startWith(undefined)
      .flatMap((descriptionFragmentOrSelectedOption: string | LookupFieldResult) => {
        if (!descriptionFragmentOrSelectedOption) {
          if (descriptionFragmentOrSelectedOption === '') {
            this.keyControl.setValue(undefined);
          }
          return Observable.of([]);
        } else if (typeof descriptionFragmentOrSelectedOption === 'object') {
          // Once an option is selected, sync both key and description fields
          if (typeof this.keyControl.value !== 'object') {
            this.keyControl.setValue(descriptionFragmentOrSelectedOption);
          }
          return Observable.of([]);
        } else {
          this.keyControl.setValue(undefined);
          return this.locationService.searchByDescription(descriptionFragmentOrSelectedOption)
            .catch(e => {
              console.error(e);
              return [];
            });
        }
      });

    this.isLoadingActiveSearch = true;
    this.gridInstanceService.SearchConfigurationChanged
      .subscribe((data: LocationSearchParams) => {
        this.form.reset();
        if (data.locationKey !== null && data.locationKey !== undefined) {
          this.locationService.searchByKey(data.locationKey)
            .subscribe((item: LookupFieldResult[]) => {
                this.keyControl.setValue(item[0]);
                this.descriptionControl.setValue(item[0]);
              }
            );
        }
        this.isLoadingActiveSearch = false;
        this.effectiveDateControl.setValue(data.effectiveDate ?
          this.dateService.fromServerToLocal(data.effectiveDate) : null);
        this.statusControl.setValue(data.status);
      }, (error) => {
        this.errorMessage = error;
        this.isLoadingActiveSearch = false;
      });
  }

  public clear() {
    this.form.reset();
  }

  public submit() {
    this.validateFormAndDisplayErrors(this.form);
    if (!this.form.invalid) {

      const typedKeyControl = <LookupFieldResult>this.keyControl.value;
      const search: LocationSearchParams = {
        locationKey: typedKeyControl ? typedKeyControl.fieldKey : undefined,
        effectiveDate: this.dateService.getLocalString(this.effectiveDateControl.value),
        status: this.statusControl.value,
      };

      this.formData.emit(search);
    }
  }

  validateFormAndDisplayErrors(form: FormGroup) {
    Object.keys(form.controls).map((controlName) => {
      form.get(controlName).markAsTouched({onlySelf: true});
    });
  }
}
