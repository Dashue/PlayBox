import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LocationService} from '../location/location.service';
import {LocationResponse} from '../location/location-response';
import {LocationSearchParams} from '../location/location-search-params';
import {
  ExportQueryParams, GridDataConfiguration,
  HasExport, HasPaging, HasSorting,
  PageQueryParams, RestrictSearch, SortQueryParams
} from '../models';

export interface GridData {
  total: number;
  data: {[key: string]: any}[];

  headers?: {
    columnId: string
    text: string,
  }[];
}

@Injectable()
export class GridDataService {

  constructor(private locationService: LocationService,
  ) {
  }

  public getData(config: GridDataConfiguration): Observable<GridData | Blob> {

    if (config.tableName === 'locationGrid') {
      return this.getLocationData(config);
    }

    return Observable.of<GridData>({data: [], total: 0}).delay(1000);
  }

  public deleteItem(tableName: string, itemId: string): Observable<boolean> {
    if (tableName === 'locationGrid') {
      return this.locationService.deleteLocation(itemId);
    }

    return Observable.of<false>();
  }

  private getLocationData(config: GridDataConfiguration): Observable<GridData | Blob> {
    const query: LocationSearchParams = <any>{
      restrictSearch: RestrictSearch.No
    };

    this.assignCommon(query, config);

    if (query.exportData) {
      return this.locationService.getLocationReport(query);
    }

    return this.locationService.getLocationData(query).map((response: LocationResponse) => {
      return <GridData>{total: response.total, data: response.data};
    });
  }

  private getPaging(config: GridDataConfiguration): PageQueryParams {
    return {
      page: config.pageIndex + 1,
      pageSize: config.pageSize
    };
  }

  private getSearchParams(config: GridDataConfiguration): object {
    const search = {};

    config.search.forEach(x => {
      search[x.columnName] = x.value;
    });

    return search;
  }

  private getSorting(config: GridDataConfiguration): SortQueryParams {
    const orderedSort = config.currentSort.sort((a, b) => (a.order - b.order));

    const gridSortColumn: string[] = orderedSort.map(x => x.name);
    const gridSortDirection: string[] = orderedSort.map(x => x.ascending ? 'asc' : 'desc');

    return {
      sortColumns: gridSortColumn,
      sortDirections: gridSortDirection
    };
  }

  private getExport(config: GridDataConfiguration): ExportQueryParams {
    if (!config.exportConfig
      || !config.exportConfig.exportConfigId
      || !config.exportConfig.outputPageSize
      || !config.exportConfig.outputType
    ) {
      return;
    }

    return {
      outputType: config.exportConfig.outputType,
      outputPageSize: config.exportConfig.outputPageSize,
      configurationId: config.exportConfig.exportConfigId,
      gridName: config.tableName
    };
  }

  private assignCommon<T extends HasExport & HasPaging & HasSorting>(
    query: T, config: GridDataConfiguration) {

    query.exportData = this.getExport(config);
    query.paging = this.getPaging(config);
    query.sorting = this.getSorting(config);

    Object.assign(query, this.getSearchParams(config));

    return query;
  }
}
