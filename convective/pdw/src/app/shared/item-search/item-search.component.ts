import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../../nav.service';
import {ItemSearchFormData} from './item-search-form/item-search-form-data';
import {GridInstanceService} from '../../grid';
import {ItemResponse} from './item.service';
import {LookupService} from '../lookup.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'hfc-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss'],
  providers: [GridInstanceService]
})
export class ItemSearchComponent implements OnInit, OnDestroy {
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
    navService.title = 'Item Search';
    navService.isBackEnabled = true;
  }

  ngOnInit() {
    this.allowExport = this.authService.isInRole('OPPDW_ITEM_DOWNLOAD');
    this.allowSaveSelection = this.authService.isInRole('OPPDW_ITEM_SAVEDSELECTION');
  }

  ngOnDestroy() {
    this.navService.showSelectItem = false;
  }

  public onFormData(form: ItemSearchFormData) {
    this.gridInstanceService.updateActiveSearch({
      productId: form.itemId,
      itemDescription: form.itemDescription,
      orderableItem: form.orderable,
      pricingUnit: form.pricingUnit,
      status: form.status
    });
  }

  public onItemSelected(item: ItemResponse) {
    this.lookupService.setCurrentProduct(item);
    this.lookupService.complete();
  }
}
