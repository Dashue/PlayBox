import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {CollectionView} from 'wijmo/wijmo';
import {Column} from 'wijmo/wijmo.grid';
import {WjFlexGrid} from 'wijmo/wijmo.angular2.grid';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavService} from '../nav.service';

@Component({
  selector: 'hfc-column-sizing-component',
  templateUrl: './column-sizing.component.html',
  styleUrls: ['./column-sizing.component.scss']
})
export class ColumnSizingComponent implements OnInit, AfterViewInit {
  @ViewChild('grid') grid: WjFlexGrid;
  public data: CollectionView;
  public widths: string;
  public widthForm: FormGroup;

  constructor(private fb: FormBuilder, private navService: NavService) {
    this.data = new CollectionView(this.generateData(5));
    this.widthForm = fb.group({index: '0', width: '50'});
    navService.title = 'Column Sizing Demo';
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.grid.getColumn('amount').width = 100;
  }

  public getColumnWidths() {
    const result = {};

    this.grid.columns.forEach((item: Column) => {
      result[item.header] = item.width;
    });

    this.widths = JSON.stringify(result);
  }

  public setColumnWidth(index: string, width: string) {
    const indexAsNumber = +index;
    const widthAsNumber = +width;
    this.grid.columns[indexAsNumber].width = widthAsNumber;
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
