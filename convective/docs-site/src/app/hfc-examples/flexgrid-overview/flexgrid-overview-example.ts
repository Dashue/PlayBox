import {Component, OnInit, ViewChild} from '@angular/core';
import {WjFlexGrid} from 'wijmo/wijmo.angular2.grid';

/**
 * @title FlexGrid Overview
 */
@Component({
  selector: 'flexgrid-overview-example',
  templateUrl: 'flexgrid-overview-example.html',
  styleUrls: ['flexgrid-overview-example.css']
})
export class FlexGridOverviewExample implements OnInit {
  @ViewChild('grid') grid: WjFlexGrid;
  data: object[];

  constructor() {
    this.data = [
      {
        PRODUCT_KEY: '292704',
        RESERVED_DATE: '08/24/2016 10:41:19 AM'
      }, {
        PRODUCT_KEY: '840006',
        RESERVED_DATE: '08/24/2016 10:41:09 AM'
      }
    ];
  }

  ngOnInit() {
    this.grid.itemsSource = this.data;
    for (let i = 0; i < this.grid.columns.length; i++) {
      this.grid.columns[i].width = '*';
    }
  }
}
