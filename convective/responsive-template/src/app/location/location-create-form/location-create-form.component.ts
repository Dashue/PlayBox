import {Component, EventEmitter, forwardRef, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {CreateRowFormComponent} from '../../maintenance/create-row/create-row-form.component';

import {LocationService} from '../location.service';
import {CreateOrUpdateLocation, Location} from '../location';

@Component({
  selector: 'hfc-location-create-form',
  templateUrl: './location-create-form.component.html',
  styleUrls: ['./location-create-form.component.scss'],
  providers: [{
    provide: CreateRowFormComponent,
    useExisting: forwardRef(function () {
      return LocationCreateFormComponent;
    }),
  }]
})
export class LocationCreateFormComponent extends CreateRowFormComponent implements OnInit {

  title: string = 'Create Location';
  private form: FormGroup;

  private keyControl: FormControl = new FormControl('', Validators.required);
  private descriptionControl: FormControl = new FormControl('', Validators.required);

  private existingLocation: Location;

  constructor(
    fb: FormBuilder,
    private locationService: LocationService,
  ) {
    super();

    this.form = fb.group({
      key: this.keyControl,
      description: this.descriptionControl,
    });
  }

  ngOnInit() {
  }

  setItemId(itemId: string) {
    this.title = 'Update Location';
    this.locationService.getLocation(itemId).subscribe(location => {
      this.existingLocation = location;

      this.keyControl.setValue(location.locationKey);
      this.descriptionControl.setValue(location.locationDesc);
    });
  }

  clear(): void {
    this.form.reset();
  }

  submit(): Observable<boolean> {
    const isValid = this.validateFormAndDisplayErrors(this.form);
    if (isValid) {

      const createLocation: CreateOrUpdateLocation = {
        locationDesc: this.descriptionControl.value,
        locationKey: this.keyControl.value,
      };

      if (this.existingLocation) {
        /* Update existing location */
        Object.assign(this.existingLocation, createLocation);
        return this.locationService.updateLocation(this.existingLocation).map(success => success);
      } else {
        /* Create new location */
        return this.locationService.createLocation(createLocation).map(success => success);
      }
    }

    return Observable.of(false);
  }
}
