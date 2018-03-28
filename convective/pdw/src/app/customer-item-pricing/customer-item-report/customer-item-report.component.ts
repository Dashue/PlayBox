import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CustomerItemPricingService} from '../customer-item-pricing.service';
import {CustomerItemPricing} from '../../models/customer-item-pricing';

@Component({
  selector: 'hfc-customer-item-report',
  templateUrl: './customer-item-report.component.html',
  styleUrls: ['./customer-item-report.component.scss']
})
export class CustomerItemReportComponent implements OnInit, OnChanges {
  @Input() customerId: string;
  @Input() customerDescription: string;
  @Input() itemId: string;
  @Input() itemKey: string;
  @Input() itemDescription: string;
  @Input() shipLocationId: string;
  @Input() priceBracketId: string;
  @Input() effectiveDate: string;
  public reportData: CustomerItemPricing;
  public errorMessage: string;

  constructor(private customerItemPricingService: CustomerItemPricingService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getReportData();
  }

  getReportData() {
    this.errorMessage = undefined;
    this.reportData = undefined;
    this.customerItemPricingService.getCustomerItemPricing(this.customerId, this.itemId, this.effectiveDate,
      this.shipLocationId, this.priceBracketId)
      .subscribe((response: CustomerItemPricing) => {
        this.reportData = response;
      }, (error) => {
        console.error(error);
        // Try both locations since the API has been moving them around
        this.errorMessage = error.error.error || error.error;
      });
  }
}
