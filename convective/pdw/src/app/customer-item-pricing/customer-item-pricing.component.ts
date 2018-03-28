import {Component, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../nav.service';
import {
  CustomerItemPricingSearchFormData
} from './customer-item-pricing-search-form/customer-item-pricing-search-form-data';
import {SoldItem} from '../models/customer-items-sold';
import {DateService} from '../shared/date.service';
import {MediaService} from '@angular/flex-layout';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'hfc-customer-item-pricing',
  templateUrl: './customer-item-pricing.component.html',
  styleUrls: ['./customer-item-pricing.component.scss']
})
export class CustomerItemPricingComponent implements OnInit {
  @ViewChild('content') searchForm: any;
  public searchPanelExpanded = true;
  public searchData: CustomerItemPricingSearchFormData;
  public selectedSoldItem: SoldItem;
  public effectiveDate: string;

  public get searchFormTitle(): string {
    return this.searchForm ? this.searchForm.title : '';
  };
  public get showReport() {
    return this.searchData && this.searchData.customerId &&
      this.searchData.itemId && this.searchData.effectiveDate;
  };
  public get showSoldItemReport() {
    return this.searchData && this.searchData.customerId &&
      this.searchData.effectiveDate && this.selectedSoldItem;
  };

  constructor(private navService: NavService,
              private dateService: DateService,
              private media: MediaService,
              private router: Router,
              private route: ActivatedRoute) {
    navService.title = 'Customer Item Pricing';
    navService.isBackEnabled = false;
  }

  ngOnInit() {
  }

  public onFormData(formData: CustomerItemPricingSearchFormData) {
    this.effectiveDate = this.dateService.getLocalString(formData.effectiveDate);
    this.searchData = formData;
  }

  public onSoldItemSelected(item: SoldItem) {
    this.selectedSoldItem = item;
    if (this.media.isActive('xs') && item) {
      this.router.navigate(['report'], {
        relativeTo: this.route,
        queryParams: {
          customerId: this.searchData.customerId,
          customerDescription: this.searchData.customerDescription.trim(),
          itemId: this.selectedSoldItem.itemId,
          itemKey: this.selectedSoldItem.itemNumber,
          itemDescription: this.selectedSoldItem.description.trim(),
          effectiveDate: this.effectiveDate,
          shipLocationId: this.searchData.shipLocationId,
          priceBracketId: this.searchData.priceBracketId
        }
      });
    }
  }
}
