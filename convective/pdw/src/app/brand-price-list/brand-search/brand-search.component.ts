import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../../nav.service';
import {Brand} from '../../models';
import {BrandSearchFormData} from './brand-search-form/brand-search-form-data';
import {GridInstanceService} from '../../grid';
import {LookupService} from '../../shared/lookup.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'hfc-brand-search',
  templateUrl: './brand-search.component.html',
  styleUrls: ['./brand-search.component.scss'],
  providers: [GridInstanceService]
})
export class BrandSearchComponent implements OnInit, OnDestroy {
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
    navService.title = 'Brand Search';
    navService.isBackEnabled = true;
  }

  ngOnInit() {
    this.allowExport = this.authService.isInRole('OPPDW_BRAND_DOWNLOAD');
    this.allowSaveSelection = this.authService.isInRole('OPPDW_BRAND_SAVEDSELECTION');
  }

  ngOnDestroy() {
    this.navService.showSelectItem = false;
  }

  public onFormData(data: BrandSearchFormData) {
    this.gridInstanceService.updateActiveSearch({
      brandId: data.brandId,
      brandDescription: data.brandDescription,
      requestedBy: data.requestedBy
    });
  }

  public onItemSelected(item: Brand) {
    this.lookupService.setCurrentBrand(item);
    this.lookupService.complete();
  }
}
