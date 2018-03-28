import {EventEmitter} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ActiveSearch} from '../models/active-search';
import {GridConfiguration} from '../models/grid-configuration';
import {SortConfiguration} from '../models/sort-configuration';
import {ColumnConfiguration} from '../models/column-configuration';
import {WjFlexGrid} from 'wijmo/wijmo.angular2.grid';

export class GridInstanceService {
  public configurationChanged: ReplaySubject<GridConfiguration> = new ReplaySubject(1);
  public SearchConfigurationChanged: EventEmitter<Object>;
  public ActiveSearchChanged: EventEmitter<ActiveSearch>;
  public ActiveSortChanged: EventEmitter<SortConfiguration[]>;
  private activeSearch: ActiveSearch;
  public searchPanelVisibility: boolean;
  private sortedProperties: {name: string, ascending: boolean}[] = [];
  public currentConfig: GridConfiguration;
  private _currentGrid: WjFlexGrid;
  public pageSize: number;

  public get ActiveSearch(): ActiveSearch {
    return this.activeSearch;
  };

  get currentGrid(): WjFlexGrid {
    return this._currentGrid;
  }

  set currentGrid(value: WjFlexGrid) {
    this._currentGrid = value;
  }

  constructor() {
    this.ActiveSearchChanged = new EventEmitter<ActiveSearch>();
    this.SearchConfigurationChanged = new EventEmitter<Object>();
    this.ActiveSortChanged = new EventEmitter<SortConfiguration[]>();

    this.configurationChanged.subscribe((config: GridConfiguration) => {
      const search = config.activeSearch.reduce((reduce, column) => {
        reduce[column.columnName] = column.value;
        return reduce;
      }, {});

      this.activeSearch = search;
      this.SearchConfigurationChanged.emit(search);

      this.searchPanelVisibility = config.searchVisibility;
    }, (error) => {
      this.SearchConfigurationChanged.error(error);
    });
  }

  public clearSort() {
    this.sortedProperties.length = 0;
    this.ActiveSortChanged.emit([]);
  }

  public applySortConfig(items: SortConfiguration[]) {
    this.sortedProperties.length = 0;
    items.sort(x => x.order).forEach(item => {
      this._updateSort(item.name, item.ascending);
    });
  }

  public updateSort(columnName: string, ascending: boolean, multiSort: boolean) {
    if (!multiSort) {
      this.sortedProperties.length = 0;
    }

    this._updateSort(columnName, ascending);

    this.ActiveSortChanged.emit(this.getActiveSort());
  }

  public getActiveSort(): SortConfiguration[] {
    const activeSort = this.sortedProperties.map((x, i): SortConfiguration => {
      return {
        ascending: x.ascending,
        name: x.name,
        order: i
      };
    });

    return activeSort || [];
  }

  public updateActiveSearch(search: ActiveSearch) {
    this.activeSearch = search;
    this.ActiveSearchChanged.emit(this.activeSearch);
  }

  private _updateSort(columnName: string, ascending: boolean) {
    const index = this.sortedProperties.findIndex(x => x.name === columnName);

    if (index > -1) {
      this.sortedProperties.splice(index, 1);
    }

    this.sortedProperties.push({name: columnName, ascending: ascending});
  }

  public getCurrentConfig(): GridConfiguration {
    const copy = Object.assign({}, this.currentConfig);
    this.populateLatestValues(copy);
    return copy;
  }

  public populateLatestValues(config: GridConfiguration) {
    config.columns = this.getCurrentColumnConfiguration(this.currentGrid);

    config.pageSize = this.pageSize;

    config.searchVisibility = this.searchPanelVisibility;

    config.activeSearch = [];
    const activeSearch = <Object>this.ActiveSearch;
    for (const key in activeSearch) {
      if (activeSearch.hasOwnProperty(key)) {
        config.activeSearch.push({columnName: key, value: activeSearch[key]});
      }
    }
  }

  private getCurrentColumnConfiguration(grid: WjFlexGrid): ColumnConfiguration[] {
    const config: ColumnConfiguration[] = [];

    const activeSort = this.getActiveSort();

    this.currentConfig.columns.forEach((cc: ColumnConfiguration) => {

      const columnSort = activeSort.find(x => x.name === cc.name);
      const gridColumn = grid.columns.getColumn(cc.name);

      if (gridColumn) {
        const item: ColumnConfiguration = {
          isReadOnly: gridColumn.isReadOnly,
          name: gridColumn.name,
          visible: gridColumn.visible,
          width: gridColumn.width,
          index: gridColumn.index,
          isSorted: !!gridColumn.currentSort && gridColumn.visible,
          isSortedAscending: gridColumn.currentSort === '+' && gridColumn.visible,
          sortOrder: !!columnSort ? columnSort.order : 0,
          align: gridColumn.align,
          id: cc.id,
          header: gridColumn.header,
          allowSort: gridColumn.allowSorting,
          hidden: cc.hidden,
          dataType: cc.dataType
        };

        config.push(item);
      } else {
        config.push(cc);
      }
    });

    return config;
  }

  public getSearchConfigToSave(name: string): GridConfiguration {
    let lastSearchConfig: GridConfiguration;
    const defaultConfig = this.getCurrentConfig();

    if (!defaultConfig.isUserDefault) {
      // Create a new default config for this user
      lastSearchConfig = Object.assign({}, defaultConfig);
      lastSearchConfig.id = 0;
      lastSearchConfig.isDefault = true;
      lastSearchConfig.name = name;

    } else {
      lastSearchConfig = defaultConfig;
    }

    return lastSearchConfig;
  }
}
