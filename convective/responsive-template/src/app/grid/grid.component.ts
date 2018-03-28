import {
  AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild
} from '@angular/core';
import {CollectionView, SortDescription} from 'wijmo/wijmo';
import {CellRangeEventArgs, Column, FlexGrid, HeadersVisibility, Row} from 'wijmo/wijmo.grid';
import {FlexGridDetailProvider} from 'wijmo/wijmo.grid.detail';
import {WjFlexGrid} from 'wijmo/wijmo.angular2.grid';
import {MatDialog, PageEvent} from '@angular/material';
import {ReactiveComponent} from '../shared/reactive.component';
import {ColumnPickerDialog} from './column-picker.dialog';
import {ConfirmationDialog, ConfirmDialogData} from '../shared/confirmation.dialog';
import {GridConfigurationComponent} from './grid-configuration.component';
import {GridData, GridDataService} from './grid-data.service';
import {GridInstanceService} from './grid-instance.service';
import {
  ColumnConfiguration, ExportMetadata, GridDataConfiguration, GridConfiguration, SortConfiguration
} from '../models';
import {NavService} from '../nav.service';
import {Subscription} from 'rxjs/Subscription';
import {GridExportService} from './grid-export.service';
import {Router} from '@angular/router';
import {GridComponentService} from './grid-component.service';

@Component({
  selector: 'hfc-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends ReactiveComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('grid') grid: WjFlexGrid;
  @ViewChild(GridConfigurationComponent) gridConfiguration: GridConfigurationComponent;
  @Input('instanceService') instanceService: GridInstanceService;
  @Input() isReadOnly: boolean = false;
  @Input() tableName: string = '';
  @Input() multiSort: boolean = false;
  @Input() autoLoadData: boolean = false;
  @Input() allowExport: boolean = false;
  @Input() allowSaveSelection: boolean = false;
  @Input() rowDetailColumns: string[] = [];
  @Input() showRowDetail: boolean = false;
  @Input() primaryKey: string;
  @Output() resultSelected: EventEmitter<any> = new EventEmitter<any>();
  public collectionView: CollectionView;
  public pageSizeOptions = [5, 10, 25, 50, 100, 250, 500, 1000];
  public currentPageIndex: number = 0;
  private isRetrievingData: boolean = false;
  public error;
  private hasConfigs: boolean = false;
  private hasSearched: boolean = false;
  public numberOfRows: number = 0;
  private topNavOnSelectSubscription: Subscription;
  lastSelectedConfig: GridConfiguration;
  private excludedColumnTypes = ['image'];

  public get showEditOptions(): boolean {
    return !this.isReadOnly && !!this.primaryKey;
  }

  public get allowEditRow(): boolean {
    return this.collectionView ? !!this.collectionView.currentItem : false;
  }

  public get allowDeleteRow(): boolean {
    return this.collectionView ? !!this.collectionView.currentItem : false;
  }

  public get showClearSort(): boolean {
    return this.collectionView && this.collectionView.sortDescriptions.length > 0;
  }

  public get pageSize(): number {
    return this.instanceService.pageSize;
  }

  public get showLoader(): boolean {
    return (this.isRetrievingData && !this.showError) || !this.hasConfigs;
  }

  public get showSelectionButton(): boolean {
    const show = this.resultSelected.observers.length > 0
      && !!this.collectionView && !!this.collectionView.currentItem && !this.showLoader;

    this.navService.showSelectItem = show;
    return show;
  }

  public get showNoRecordsMessage(): boolean {
    return !!this.collectionView
      && this.collectionView.totalItemCount === 0
      && !this.showLoader
      && !this.showError;
  }

  public get showGrid(): boolean {
    return !this.showLoader && !this.showNoRecordsMessage && !this.error && this.hasConfigs
      && this.collectionView && this.collectionView.totalItemCount > 0;
  }

  public get showGridContainer(): boolean {
    return this.hasConfigs && this.hasSearched;
  }

  public get showError(): boolean {
    return this.error;
  }

  constructor(private dialog: MatDialog,
              private gridDataService: GridDataService,
              private navService: NavService,
              private exportService: GridExportService,
              public router: Router,
              private gridComponentService: GridComponentService) {
    super();
  }

  public ngOnInit() {
    this.grid.sortedColumnNg.subscribe((event: CellRangeEventArgs) => this.onSortingColumn(event));
    this.topNavOnSelectSubscription = this.navService.selectItem.subscribe(() => this.onSelect());
    this.instanceService.pageSize = this.pageSizeOptions[0];
  }

  public ngAfterViewInit() {
    this.instanceService.configurationChanged
      .asObservable()
      .do(config => {
        this.hasConfigs = true;
        this.lastSelectedConfig = config;

        if (config.pageSize > 0) {
          this.instanceService.pageSize = config.pageSize;
        }
      })
      .skip(this.autoLoadData ? 0 : 1)
      .subscribe((config: GridConfiguration) => {
        this.hasSearched = true;
        this.applyGridConfig(config);
      });

    this.observePropertyCurrentValue<string>('tableName')
      .subscribe((gridName: string) => {
        this.switchGrid(gridName);
      });

    this.instanceService.ActiveSortChanged.subscribe(activeSort => this.onSortingChanged(activeSort));
    this.instanceService.ActiveSearchChanged.subscribe(() => {
      this.hasSearched = true;
      this.onSearchChanged();
    });
  }

  public ngOnDestroy() {
    if (this.topNavOnSelectSubscription) {
      this.topNavOnSelectSubscription.unsubscribe();
    }
  }

  public onPageChanged(event: PageEvent) {
    this.instanceService.pageSize = event.pageSize;
    this.clearSelection();
    this.refreshData(event.pageIndex);
  }

  public onSelect() {
    this.resultSelected.emit(this.collectionView.currentItem);
  }

  public deleteCurrentRow() {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete?'
    };

    this.dialog.open(ConfirmationDialog, {data: dialogData, panelClass: 'confirmationDialog'})
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          const primaryKey = this.getCurrentItemId();
          if (primaryKey) {
            this.gridDataService.deleteItem(this.tableName, primaryKey)
              .subscribe(success => {
                if (success) {
                  this.refreshData();
                }
              });
          }
        }
      });
  }

  public openColumnPicker() {
    const currentConfig = this.instanceService.getCurrentConfig();
    const columns = this.grid.columns.filter((gridColumn: Column) => {
      const columnConfig = currentConfig.columns.find(c => c.name === gridColumn.name);

      return columnConfig && columnConfig.hidden === false;
    });

    this.dialog.open(ColumnPickerDialog,
      {disableClose: true, data: columns, panelClass: 'columnPickerDialog'})
      .afterClosed()
      .subscribe((columnNames: string[]) => {
        this.grid.columns.forEach((value: Column) => {
          value.visible = columnNames.indexOf(value.name) > -1;
        });
      });
  }

  public clearSort() {
    this.collectionView.sortDescriptions.clear();
    this.instanceService.clearSort();
  }

  requestExport() {
    if (!this.allowExport) {
      return;
    }
    this.exportService.exportFile(this);
  }

  private onSortingColumn(event: CellRangeEventArgs) {
    const column: Column = this.grid.columns[event.col];

    this.instanceService.updateSort(column.name, column.currentSort === '+', this.multiSort);
  }

  private onSortingChanged(sort: SortConfiguration[], refreshData: boolean = true) {
    this.collectionView.sortDescriptions.clear();

    sort.forEach((item) => {
      const column = this.grid.getColumn(item.name);
      if (column && column.isVisible) {
        this.collectionView.sortDescriptions.push(new SortDescription(column.binding, item.ascending));
      }
    });

    if (refreshData) {
      this.refreshData();
    }
  }

  private onSearchChanged() {
    this.refreshData();
  }

  private refreshData(pageIndex: number = 0) {
    this.currentPageIndex = pageIndex;

    this.applyGridConfig(this.instanceService.getCurrentConfig());
  }

  /**
   * Sets the grid for the GridConfigurationComponent and the GridInstanceService.
   * @param {string} gridName
   */
  private switchGrid(gridName: string): void {
    this.clearSelection();
    this.gridConfiguration.setGrid(gridName, this.grid);
  }

  private clearSelection(): void {
    this.grid.select(-1, -1);
  }

  getGridDataConfig(config: GridConfiguration, exportData?: ExportMetadata): GridDataConfiguration {
    return {
      pageIndex: this.currentPageIndex,
      pageSize: this.pageSize,
      tableName: this.tableName,
      currentSort: this.instanceService.getActiveSort(),
      search: config.activeSearch,
      exportConfig: exportData
    };
  }

  private applyGridConfig(config: GridConfiguration): void {
    const dataConfig = this.getGridDataConfig(config);
    this.isRetrievingData = true;
    this.error = null;
    this.gridDataService.getData(dataConfig).subscribe((gridData: GridData) => {
      if (gridData.headers) {
        config.columns.forEach(column => {
          const headerColumn = gridData.headers.find(header => header.columnId === column.name);

          if (headerColumn) {
            /* Overwrite column headers on grid config */
            column.header = headerColumn.text;
          } else {
            /* Hide columns not included in grid data headers */
            column.visible = false;
          }
        });
      }

      this.numberOfRows = gridData.total;

      this.collectionView = new CollectionView(gridData.data);
      // noinspection JSUnusedLocalSymbols
      this.collectionView._performSort = (items: any[]) => {
        /* Intentionally left blank */
      };
      this.collectionView.pageSize = this.pageSize;

      this.grid.columns.clear();
      this.grid.itemsSource = this.collectionView;

      if (config) {
        if (this.showRowDetail) {
          this.initDetailProvider(this.grid);
        }

        config.columns.forEach((item: ColumnConfiguration) => {
          /* Add all columns */
          const column = this.grid.getColumn(item.name);

          if (!column) {
            this.grid.columns.insert(this.grid.columns.length, new Column({
              name: item.name,
              header: item.header
            }));
          } else {
            if (this.excludedColumnTypes.includes(item.dataType.toLowerCase())) {
              this.grid.columns.remove(column);
            }
          }
        });

        config.columns.forEach((item: ColumnConfiguration) => {
          if (this.excludedColumnTypes.includes(item.dataType.toLowerCase())) {
            return;
          }

          const column = this.grid.getColumn(item.name);

          column.header = item.header;
          column.name = item.name;
          column.width = item.width > 0 ? item.width : 140;
          column.align = item.align;
          column.isReadOnly = this.isReadOnly || item.isReadOnly;
          column.visible = this.getColumnVisibility(item);
          column.allowSorting = item.allowSort;
          column.format = this.getColumnFormat(item.dataType);
          this.grid.columns.moveElement(column.index, item.index);
        });

        this.collectionView.sortDescriptions.clear();
        const activeSort = [];

        config.columns.forEach(x => {
          if (x.isSorted && x.allowSort) {
            activeSort.push({
              order: x.sortOrder,
              name: x.name,
              ascending: x.isSortedAscending,
            });
          }
        });

        this.instanceService.applySortConfig(activeSort);
        this.onSortingChanged(activeSort, false);
        this.isRetrievingData = false;
      }
    }, err => {
      this.error = JSON.parse(err.error).error;
    });
  }

  private getColumnFormat(dataType: string): string {
    if (dataType === 'String') {
      return 'D';  // Format numbers being sent as strings without decimal characters
    }
    return '';
  }

  private initDetailProvider(grid: FlexGrid) {
    const detailProvider = new FlexGridDetailProvider(grid);

    // create detail cells for a given row
    detailProvider.createDetailCell = (row: Row) => {
      const cell = document.createElement('div');
      grid.hostElement.appendChild(cell);

      const data = [];

      for (const key in row.dataItem) {
        if (row.dataItem.hasOwnProperty(key) && this.rowDetailColumns.indexOf(key) > -1) {
          const header = grid.getColumn(key).header;
          const item = {
            field: header,
            value: row.dataItem[key]
          };

          data.push(item);
        }
      }

      // noinspection JSUnusedLocalSymbols
      const detailGrid = new FlexGrid(cell, {
        headersVisibility: HeadersVisibility.None,
        autoGenerateColumns: true,
        itemsSource: data,
        columns: [
          {header: 'Field', binding: 'field', width: 140, isReadOnly: true},
          {header: 'Value', binding: 'value', isReadOnly: true, format: 'D'},
        ]
      });
      cell.parentElement.removeChild(cell);
      return cell;
    };
  }

  private getColumnVisibility(column: ColumnConfiguration) {
    if (this.showRowDetail) {
      if (this.rowDetailColumns.includes(column.name)) {
        return false;
      }
    }

    return column.visible;
  }

  private toEditRow() {
    this.gridComponentService.setTemporaryConfig(this.tableName, this.instanceService.getCurrentConfig());

    const primaryKey = this.getCurrentItemId();
    if (primaryKey) {
      this.router.navigate(['maintenance/edit'], {
        queryParams: {
          tableName: this.tableName,
          id: primaryKey
        }
      });
    }
  }

  private toCreateRow() {
    this.gridComponentService.setTemporaryConfig(this.tableName, this.instanceService.getCurrentConfig());

    this.router.navigate(['maintenance/new'], {
      queryParams: {
        tableName: this.tableName
      }
    });
  }

  private getCurrentItemId(): string {
    const item = this.collectionView.currentItem;

    if (!item.hasOwnProperty(this.primaryKey)) {
      this.error = `The currently selected item does not contain the primary key: ${this.primaryKey}`;
    } else {
      return item[this.primaryKey];
    }
  }
}
