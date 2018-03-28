import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../../nav.service';
import {ShipLocationSearchFormData} from './ship-location-search-form/ship-location-search-form-data';
import {ShipLocation} from '../../models';
import {LookupService} from '../../shared/lookup.service';
import {GridInstanceService} from '../../grid';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'hfc-ship-location-search',
  templateUrl: './ship-location-search.component.html',
  styleUrls: ['./ship-location-search.component.scss'],
  providers: [GridInstanceService]
})
export class ShipLocationSearchComponent implements OnInit, OnDestroy {
  @ViewChild('content') searchForm: any;
  public searchPanelExpanded = true;

  public allowExport: boolean;
  public allowSaveSelection: boolean;

  public get searchFormTitle(): string {
    return this.searchForm ? this.searchForm.title : '';
  };

  constructor(private navService: NavService,
              private lookupService: LookupService,
              public gridInstanceService: GridInstanceService,
              private authService: AuthService) {
    navService.title = 'Ship Loc Search';
    navService.isBackEnabled = true;
  }

  ngOnInit() {
    this.allowExport = this.authService.isInRole('OPPDW_SHIPLOC_DOWNLOAD');
    this.allowSaveSelection = this.authService.isInRole('OPPDW_SHIPLOC_SAVEDSELECTION');
  }

  ngOnDestroy() {
    this.navService.showSelectItem = false;
  }

  public onFormData(form: ShipLocationSearchFormData) {
    this.gridInstanceService.updateActiveSearch({
     plantNumber: form.plantNumber,
     plantName: form.plantName
    });
  }

  public onItemSelected(item: ShipLocation) {
    this.lookupService.setCurrentShipLocation(item);
    this.lookupService.complete();
  }
}
