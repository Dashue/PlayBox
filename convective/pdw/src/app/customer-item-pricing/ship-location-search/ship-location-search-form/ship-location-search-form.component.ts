import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LookupFieldResult} from '../../../models/lookup-field-result';
import {Observable} from 'rxjs/Observable';
import {ShipLocationSearchFormData} from './ship-location-search-form-data';
import {GridInstanceService} from '../../../grid';
import {ShipLocationSearchParams} from '../../ship-locations.service';

@Component({
  selector: 'hfc-ship-location-search-form',
  templateUrl: './ship-location-search-form.component.html',
  styleUrls: ['./ship-location-search-form.component.scss']
})
export class ShipLocationSearchFormComponent implements OnInit {
  @Output() formData: EventEmitter<ShipLocationSearchFormData>;
  public title = 'Search Ship Locations';
  public form: FormGroup;
  public filteredShipLocationIdOptions: Observable<LookupFieldResult[]>;
  public filteredShipLocationDescriptionOptions: Observable<LookupFieldResult[]>;
  public gridConfigLoaded = false;
  public errorMessage: string;

  public shipLocationControl = new FormControl('');
  public descriptionControl = new FormControl('');

  constructor(fb: FormBuilder, private gridInstanceService: GridInstanceService) {
    this.formData = new EventEmitter<ShipLocationSearchFormData>();
    this.form = fb.group({
      plantNumber: this.shipLocationControl,
      plantName: this.descriptionControl
    });
  }

  ngOnInit() {
    this.gridInstanceService.SearchConfigurationChanged
      .subscribe((data: ShipLocationSearchParams) => {
        this.clear();
        this.shipLocationControl.setValue(data.plantNumber ? String(data.plantNumber) : '');
        this.descriptionControl.setValue(data.plantName);
        this.gridConfigLoaded = true;
      }, (error) => {
        this.errorMessage = error;
      });
  }

  public clear() {
    this.form.reset();
  }

  public submit() {
    this.formData.emit({
      plantNumber: this.shipLocationControl.value,
      plantName: this.descriptionControl.value
    });
  }
}
