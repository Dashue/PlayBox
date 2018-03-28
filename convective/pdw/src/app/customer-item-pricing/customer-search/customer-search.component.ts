import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../../nav.service';
import {CustomerSearchFormData} from './customer-search-form/customer-search-form-data';
import {LookupService} from '../../shared/lookup.service';
import {GridInstanceService} from '../../grid';
import {Customer} from '../../models';
import {CustomersSearchParams} from '../customers.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'hfc-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss'],
  providers: [GridInstanceService]
})
export class CustomerSearchComponent implements OnInit, OnDestroy {
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
    navService.title = 'Customer Search';
    navService.isBackEnabled = true;
  }

  ngOnInit() {
    this.allowExport = this.authService.isInRole('OPPDW_CUSTOMER_DOWNLOAD');
    this.allowSaveSelection = this.authService.isInRole('OPPDW_CUSTOMER_SAVEDSELECTION');
  }

  ngOnDestroy() {
    this.navService.showSelectItem = false;
  }

  public onFormData(formData: CustomerSearchFormData) {
    const search: CustomersSearchParams = {
      bracketId: formData.bracketId,
      city: formData.city,
      customerNumber: formData.customerNumber,
      customerName: formData.customerName,
      outletName: formData.outletDescription,
      outletNumber: formData.outletId,
      priceListId: formData.priceListId,
      state: formData.state,
      zipCode: formData.zipCode
    };

    this.gridInstanceService.updateActiveSearch(search);
  }

  public onItemSelected(item: Customer) {
    this.lookupService.setCurrentCustomer(item);
    this.lookupService.complete();
  }
}
