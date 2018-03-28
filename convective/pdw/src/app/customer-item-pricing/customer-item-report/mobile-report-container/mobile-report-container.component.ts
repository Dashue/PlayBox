import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NavService} from '../../../nav.service';

@Component({
  selector: 'hfc-mobile-report-container',
  templateUrl: './mobile-report-container.component.html',
  styleUrls: ['./mobile-report-container.component.scss']
})
export class MobileReportContainerComponent implements OnInit {
  customerId: string;
  customerDescription: string;
  itemId: string;
  itemKey: string;
  itemDescription: string;
  shipLocationId: string;
  priceBracketId: string;
  effectiveDate: string;

  constructor(private route: ActivatedRoute,
              private navService: NavService) {
    navService.isBackEnabled = true;
    navService.title = 'Pricing Report';
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.customerId = paramMap.get('customerId');
      this.customerDescription = paramMap.get('customerDescription');
      this.itemId = paramMap.get('itemId');
      this.itemKey = paramMap.get('itemKey');
      this.itemDescription = paramMap.get('itemDescription');
      this.shipLocationId = paramMap.get('shipLocationId');
      this.priceBracketId = paramMap.get('priceBracketId');
      this.effectiveDate = paramMap.get('effectiveDate');
    });
  }
}
