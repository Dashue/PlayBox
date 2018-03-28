import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {GridInstanceService} from '../grid';
import {LocationSearchParams} from './location-search-params';
import {AuthService} from '../auth.service';
import {GridInfo} from '../models/grid-info';

@Component({
  selector: 'hfc-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [GridInstanceService]
})
export class LocationComponent implements OnInit {
  @ViewChild('content') searchForm: any;
  @Input('gridInfo') gridInfo: GridInfo;
  public searchPanelExpanded = true;
  public allowExport: boolean;
  public isReadOnly: boolean;
  primaryKey: string;

  public get searchFormTitle(): string {
    return this.searchForm ? this.searchForm.title : '';
  }

  constructor(public gridInstanceService: GridInstanceService,
              public media: ObservableMedia,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.allowExport = this.authService.isInRole(this.gridInfo.exportRole);
    this.isReadOnly = !this.authService.isInRole(this.gridInfo.editRole);
    this.primaryKey = this.gridInfo.primaryKey;
  }

  public onFormData(search: LocationSearchParams) {
    this.gridInstanceService.updateActiveSearch(search);
  }
}
