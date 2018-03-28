import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GridConfiguration} from '../models/grid-configuration';
import {ColumnConfiguration} from '../models/column-configuration';
import {ApiService} from '../shared/api/api.service';
import {ColumnPref, GetGridPrefsResponse, GridPref, QueryColumn} from '../shared/api/getGridPrefsResponse';

@Injectable()
export class GridConfigurationService {
  private gridConfigUrl = this.api.baseUrl + '/gridConfigurations';

  public get REPORTING_USER_DEFAULT_CONFIG(): string {
    return 'usersLastSearch';
  }

  constructor(private api: ApiService) {
  }

  public getConfigurations(gridName: string): Observable<GridConfiguration[]> {
    const url = this.gridConfigUrl + '&gridName=' + gridName;

    return this.api.get(url)
      .map((response: GetGridPrefsResponse): GridConfiguration[] => {
        return response.configs ? response.configs.map(this.mapPrefToConfig) : [];
      });
  }

  public getDefaultConfiguration(gridName: string): Observable<GridConfiguration> {
    return this.getConfigurations(gridName).map((configs: GridConfiguration[]) => {
      let defaultConfig;
      for (let i = 0; i < configs.length; i++) {
        if (configs[i].isUserDefault) {
          return configs[i];
        } else if (configs[i].isDefault) {
          defaultConfig = configs[i];
        }
      }
      return defaultConfig;
    });
  }

  public saveConfiguration(config: GridConfiguration): Observable<GridConfiguration> {
    const pref = this.mapConfigToPref(config);

    if (config.id === 0) {
      const url = this.gridConfigUrl;
      return this.api.post(url, {data: pref}).map(this.mapPrefToConfig);
    } else {
      const url = `${this.gridConfigUrl}/${config.id}`;
      return this.api.put(url, {data: pref}).map(this.mapPrefToConfig);
    }
  }

  public deleteConfiguration(config: GridConfiguration): Observable<string> {
    const url = `${this.gridConfigUrl}/${config.id}`;
    return this.api.delete(url);
  }

  public mapConfigToPref(g: GridConfiguration): GridPref {
    const columns: ColumnPref[] = g.columns.map(c => {
      return {
        width: c.width,
        cellAlignment: c.align,
        id: c.id,
        name: c.name,
        visible: c.visible,
        displayName: c.header,
        order: c.index,
        isSortable: c.allowSort,
        dataType: c.dataType,
        hidden: c.hidden
      };
    });

    const queryColumns: QueryColumn[] = g.activeSearch.map(item => {
      return {columnName: item.columnName, value: item.value || ''};
    });

    return {
      columns: columns,
      pageSize: g.pageSize,
      id: g.id,
      searchConfig: queryColumns,
      name: g.name,
      showSearch: g.searchVisibility,
      sortConfig: [],
      isDefault: g.isDefault,
      isUserDefault: g.isUserDefault,
      gridName: g.gridName,
      temporaryConfiguration: g.temporaryConfiguration
    };
  }

  private mapPrefToConfig(pref: GridPref): GridConfiguration {
    const activeSearch = pref.searchConfig ? pref.searchConfig.map(item => {
      return {columnName: item.columnName, value: item.value === '' ? undefined : item.value};
    }) : [];

    return {
      id: pref.id,
      isDefault: pref.isDefault,
      isUserDefault: pref.isUserDefault,
      columns: pref.columns.map((c): ColumnConfiguration => {
        const isSorted = pref.sortConfig.find(x => x.columnId === c.id);
        return {
          index: c.order,
          isReadOnly: false,
          isSorted: !!isSorted,
          isSortedAscending: !!isSorted && isSorted.sortDirection === 'ASC',
          sortOrder: 0, // Todo: Remove hard-coded sort order
          name: c.name,
          visible: c.visible,
          width: c.width,
          id: c.id,
          align: c.cellAlignment,
          header: c.displayName,
          allowSort: c.isSortable,
          hidden: c.hidden,
          dataType: c.dataType
        };
      }),
      name: pref.name,
      pageSize: pref.pageSize,
      activeSearch: activeSearch,
      searchVisibility: pref.showSearch,
      gridName: pref.gridName,
      temporaryConfiguration: pref.temporaryConfiguration
    };
  }
}
