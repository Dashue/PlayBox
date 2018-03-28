import {Component, OnInit, ViewChild} from '@angular/core';
import {WjFlexGrid} from 'wijmo/wijmo.angular2.grid';

/**
 * @title FlexGrid
 */
@Component({
  selector: 'flexgrid-example',
  templateUrl: 'flexgrid-example.html',
  styleUrls: ['flexgrid-example.css']
})
export class FlexGridExample implements OnInit {
  @ViewChild('grid') grid: WjFlexGrid;
  data: object[];

  constructor() {
    this.data = [
      {
        DYNAMIC_MAINT_KEY: 'G',
        DYNAMIC_MAINT_DESC: 'Grocery',
        DYNAMIC_MAINT_ORDER: 100,
        STATUS: 'ACTIVE',
        LONG_DESCRIPTION: '',
        INACTIVE_DATE: '01/01/3000 12:00:00 AM',
        CREATED_BY: 'JUSTIN R. KROGMANN',
        CREATED_DATE: '01/05/2012 12:10:52 PM',
        UPDATED_BY: '',
        UPDATED_DATE: '',
        EFFECTIVE_DATE: '01/05/2012 12:10:52 PM'
      }, {
        DYNAMIC_MAINT_KEY: 'M',
        DYNAMIC_MAINT_DESC: 'Meat / Refrigerated',
        DYNAMIC_MAINT_ORDER: 200,
        STATUS: 'ACTIVE',
        LONG_DESCRIPTION: '',
        INACTIVE_DATE: '01/01/3000 12:00:00 AM',
        CREATED_BY: 'JUSTIN R. KROGMANN',
        CREATED_DATE: '01/05/2012 12:11:00 PM',
        UPDATED_BY: '',
        UPDATED_DATE: '',
        EFFECTIVE_DATE: '01/05/2012 12:11:00 PM'
      }, {
        DYNAMIC_MAINT_KEY: 'J',
        DYNAMIC_MAINT_DESC: 'Janitorial',
        DYNAMIC_MAINT_ORDER: 300,
        STATUS: 'INACTIVE',
        LONG_DESCRIPTION: '',
        INACTIVE_DATE: '01/02/3000 12:00:00 AM',
        CREATED_BY: 'JUSTIN R. KROGMANN',
        CREATED_DATE: '01/07/2012 12:11:00 PM',
        UPDATED_BY: '',
        UPDATED_DATE: '',
        EFFECTIVE_DATE: '01/07/2012 12:11:00 PM'
      }, {
        DYNAMIC_MAINT_KEY: 'S',
        DYNAMIC_MAINT_DESC: 'Service',
        DYNAMIC_MAINT_ORDER: 400,
        STATUS: 'ACTIVE',
        LONG_DESCRIPTION: '',
        INACTIVE_DATE: '01/03/3000 12:00:00 AM',
        CREATED_BY: 'JUSTIN R. KROGMANN',
        CREATED_DATE: '01/08/2012 12:11:00 PM',
        UPDATED_BY: '',
        UPDATED_DATE: '',
        EFFECTIVE_DATE: '01/08/2012 12:11:00 PM'
      }
    ];
  }

  ngOnInit() {
    this.grid.itemsSource = this.data;
    this.grid.autoSizeColumns(0, this.data.length, false, 0);
  }
}
