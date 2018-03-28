import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CollectionView, SortDescription} from 'wijmo/wijmo';
import {CellRangeEventArgs, Column} from 'wijmo/wijmo.grid';
import {WjFlexGrid} from 'wijmo/wijmo.angular2.grid';
import {MdDialog, PageEvent} from '@angular/material'
import {ReactiveComponent} from '../shared/reactive.component';
import {ColumnPickerComponent} from './column-picker.component';
import {ConfirmationDialogComponent, ConfirmDialogData} from '../shared/confirmation-dialog.component';

export interface Sorting {
  name: string,
  ascending: boolean
}

@Component({
  selector: 'hfc-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends ReactiveComponent implements OnInit {
  @ViewChild('grid') grid: WjFlexGrid;
  @Input() data: any[];
  @Input() isReadOnly: boolean = false;
  @Output() rowDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortChanged: EventEmitter<Sorting[]> = new EventEmitter<Sorting[]>();
  collectionView: CollectionView = new CollectionView([]);
  public gridOptionsForm: FormGroup;
  public pageSizeOptions = [5, 10, 25, 50];
  public get showEditOptions(): boolean {return !this.isReadOnly};
  public get allowEditRow(): boolean {return !!this.collectionView.currentItem};
  public get allowDeleteRow(): boolean {return !!this.collectionView.currentItem};
  public get showClearSort(): boolean {return this.collectionView.sortDescriptions.length > 0};
  private pageSize: number = this.pageSizeOptions[0];
  private sortedProperties: {name: string, binding: string, ascending: boolean}[] = [];

  constructor(private fb: FormBuilder, private dialog: MdDialog) {
    super();
  }

  public ngOnInit() {
    this.gridOptionsForm = this.fb.group({'gridConfig': 'System Default'});

    this.observePropertyCurrentValue<any[]>('data').subscribe(data => {
      this.refreshGridData(data);
    });

    this.collectionView._performSort = (items: any[]) => { /* Intentionally left blank */ };
    this.grid.sortedColumnNg.subscribe((event: CellRangeEventArgs) => this.onSortingColumn(event));
  }

  public onPageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.collectionView.moveToPage(event.pageIndex);
    this.collectionView.pageSize = event.pageSize;
    this.clearSelection();
  }

  public deleteCurrentRow() {
    const data: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete?'
    };
    this.dialog.open(ConfirmationDialogComponent, {data: data, panelClass: 'confirmationDialog'})
    .afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.rowDeleted.emit(this.collectionView.currentItem);
      }
    });
  }

  public openColumnPicker() {
    this.dialog.open(ColumnPickerComponent,
      {disableClose: true, data: this.grid.columns, panelClass: 'columnPickerDialog'})
      .afterClosed().subscribe((columnNames: string[]) => {
        this.grid.columns.forEach((value: Column) => {
          value.visible = columnNames.indexOf(value.name) > -1;
        })
      });
  }

  public clearSort() {
    this.collectionView.sortDescriptions.clear();
    this.sortedProperties.length = 0;

    this.onSortingChanged();
  }

  private onSortingColumn(event: CellRangeEventArgs) {
    if (this.sortedProperties.length <= this.grid.columns.length) {
      let isSorted = false;
      const currentColumn: Column = this.grid.columns[event.col];

      this.sortedProperties.forEach(element => {
        if (element.name === currentColumn.name) {
          element.ascending = currentColumn.currentSort === '+';
          isSorted = true;
        }
      });

      if (!isSorted) {
        this.sortedProperties.push({name: currentColumn.name, binding: currentColumn.binding,
          ascending: true});
      }
    }

    this.collectionView.sortDescriptions.clear();
    if (this.sortedProperties.length > 0) {
      for (let i = 0; i < this.sortedProperties.length; i++) {
        const sortDesc = new SortDescription(this.sortedProperties[i].binding,
          this.sortedProperties[i].ascending);
        this.collectionView.sortDescriptions.push(sortDesc);
      }
    }

    this.onSortingChanged();
  }

  private onSortingChanged() {
    const result: Sorting[] = [];

    this.collectionView.sortDescriptions.forEach((item: SortDescription) => {
      result.push({name: item.property, ascending: item.ascending});
    });

    this.sortChanged.emit(result);
  }

  private refreshGridData(data: any[]): void {
    this.collectionView = new CollectionView(data);
    this.collectionView.pageSize = this.pageSize;
    this.grid.itemsSource = this.collectionView;

    this.clearSort();
    this.clearSelection();
    this.configureColumns();
  }

  private clearSelection(): void {
    this.grid.select(-1, -1);
  }

  private configureColumns(): void {
    for (let i = 0; i < this.grid.columns.length; i++) {
      this.grid.columns[i].isReadOnly = true;
    }
    this.grid.autoSizeColumns(0, this.grid.columns.length, false, 15);
  }
}
