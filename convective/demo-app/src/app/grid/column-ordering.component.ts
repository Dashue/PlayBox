import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CollectionView} from 'wijmo/wijmo';
import {Column} from 'wijmo/wijmo.grid';
import {WjFlexGrid} from 'wijmo/wijmo.angular2.grid';
import {NavService} from '../nav.service';

@Component({
  selector: 'hfc-column-ordering-component',
  templateUrl: './column-ordering.component.html',
  styleUrls: ['./column-ordering.component.scss']
})
export class ColumnOrderingComponent implements OnInit, AfterViewInit {
  @ViewChild('grid') grid: WjFlexGrid;
  public data: CollectionView;
  public ordering: string;

  constructor(private navService: NavService) {
    this.data = new CollectionView(this.generateData(5));
    navService.title = 'Column Ordering Demo';
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  public moveColumn(from, to) {
    this.grid.columns.moveElement(from, to);
  }

  public getColumnOrdering() {
    const result = {};

    this.grid.columns.forEach((item: Column) => {
      result[item.header] = item.index;
    });

    this.ordering = JSON.stringify(result);
  }

  private generateData(count: number): any[] {
    const countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    const data = [];

    for (let i = 0; i < count; i++) {
      data.push({
        id: i,
        country: countries[i % countries.length],
        date: new Date(2014, i % 12, i % 28),
        amount: Math.random() * 10000,
        active: i % 4 === 0
      });
    }

    return data;
  }
}
