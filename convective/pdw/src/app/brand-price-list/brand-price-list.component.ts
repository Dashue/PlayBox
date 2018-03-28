import {Component, OnInit, ViewChild} from '@angular/core';
import {MediaService} from '@angular/flex-layout';
import {NavService} from '../nav.service';
import {PriceList} from '../models/price-list';
import {GridInstanceService} from '../grid';
import {BrandPriceListSearchParams} from './brand-price-list-search-params';
import {AuthService} from '../auth.service';

@Component({
  selector: 'hfc-brand-price-list',
  templateUrl: './brand-price-list.component.html',
  styleUrls: ['./brand-price-list.component.scss'],
  providers: [GridInstanceService]
})
export class BrandPriceListComponent implements OnInit {
  @ViewChild('content') searchForm: any;
  public searchPanelExpanded = true;
  public priceList: PriceList;
  public showRowDetail: boolean;
  public rowDetailColumns = ['bracket1', 'bracket2', 'bracket3', 'bracket4',
                            'bracket5', 'bracket6', 'bracket6', 'bracket7', 'bracket8'];

  public get searchFormTitle(): string {
    return this.searchForm ? this.searchForm.title : '';
  };

  public allowExport: boolean;

  constructor(navService: NavService,
              public gridInstanceService: GridInstanceService,
              public media: MediaService,
              private authService: AuthService) {
    navService.title = 'Brand Price List';
    navService.isBackEnabled = false;
  }

  ngOnInit() {
    this.allowExport = this.authService.isInRole('OPPDW_BRAND_PRICE_LIST_DOWNLOAD');
    this.showRowDetail = this.media.isActive('xs')
  }

  public onFormData(query: BrandPriceListSearchParams) {
    this.gridInstanceService.updateActiveSearch(query);
  }
}
