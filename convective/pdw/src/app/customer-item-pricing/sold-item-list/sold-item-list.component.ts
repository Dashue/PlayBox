import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CustomerItemsSoldService} from '../customer-items-sold.service';
import {CustomerItemsSold, SoldItem} from '../../models/customer-items-sold';

@Component({
  selector: 'hfc-sold-item-list',
  templateUrl: './sold-item-list.component.html',
  styleUrls: ['./sold-item-list.component.scss']
})
export class SoldItemListComponent implements OnInit, OnChanges {
  @Output() soldItemSelected: EventEmitter<SoldItem> = new EventEmitter<SoldItem>();
  @Input() customerId: string;
  @Input() effectiveDate: string;
  public soldItemsList: SoldItem[];
  public selectedItem: SoldItem;
  public errorMessage: string;

  constructor(private customerItemsSoldService: CustomerItemsSoldService) {}

  ngOnInit() {
  }

  ngOnChanges() {
    this.soldItemSelected.emit(undefined);
    this.getSoldItems();
  }

  getSoldItems() {
    this.errorMessage = undefined;
    this.soldItemsList = undefined;
    this.customerItemsSoldService.getCustomerItemsSold(this.customerId, this.effectiveDate)
    .subscribe((response: CustomerItemsSold) => {
      this.soldItemsList = response.data;
    }, (error) => {
      console.error(error);
      this.errorMessage = `Error ${error.error.error}`;
    });
  }

  public onItemClick(item: SoldItem) {
    this.selectedItem = item;
    this.soldItemSelected.emit(item);
  }
}
