import {Component, OnInit, ViewChild} from '@angular/core';
import {MediaService} from '@angular/flex-layout';
import {NavService} from '../nav.service';
import {StaticLookupsService} from '../static-lookups.service';
import {PriceList} from '../models';
import {GridInstanceService} from '../grid';
import {ItemPriceListSearchParams} from './item-price-list-search-params';
import {AuthService} from '../auth.service';

@Component({
  selector: 'hfc-item-price-list',
  templateUrl: './item-price-list.component.html',
  styleUrls: ['./item-price-list.component.scss'],
  providers: [GridInstanceService]
})
export class ItemPriceListComponent implements OnInit {
  @ViewChild('content') searchForm: any;
  public searchPanelExpanded = true;
  public priceList: PriceList;
  public showRowDetail: boolean;
  public rowDetailColumns = ['bracket1', 'bracket2', 'bracket3', 'bracket4',
                              'bracket5', 'bracket6', 'bracket6', 'bracket7'];
  public get searchFormTitle(): string {
    return this.searchForm ? this.searchForm.title : '';
  };

  public allowExport: boolean;

  constructor(navService: NavService,
              public staticLookupsService: StaticLookupsService,
              public gridInstanceService: GridInstanceService,
              public media: MediaService,
              private authService: AuthService) {
    navService.title = 'Item Price List';
    navService.isBackEnabled = false;
  }

  ngOnInit() {
    this.allowExport = this.authService.isInRole('OPPDW_ITEM_PRICE_LIST_DOWNLOAD');
    this.showRowDetail = this.media.isActive('xs');
  }

  public onFormData(search: ItemPriceListSearchParams) {
    this.gridInstanceService.updateActiveSearch(search);
  }
}
