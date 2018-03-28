import {Component, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../nav.service';

@Component({
  selector: 'hfc-item-base-prices',
  templateUrl: './item-base-prices.component.html',
  styleUrls: ['./item-base-prices.component.scss']
})
export class ItemBasePricesComponent implements OnInit {
  @ViewChild('content') searchForm: any;
  public get searchFormTitle(): string {return this.searchForm ? this.searchForm.title : ''};
  public searchPanelExpanded = true;

  constructor(navService: NavService) {
    navService.title = 'Item Base Prices';
    navService.isBackEnabled = false;
  }

  ngOnInit() {}

  public onFormData(form: Object) {
    console.log(`Search executed: ${JSON.stringify(form)}`);
  }
}
