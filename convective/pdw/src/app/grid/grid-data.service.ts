import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {GridDataConfiguration} from '../models/grid-data-configuration';
import {ItemListResponse, ItemSearchParams, ItemService} from '../shared/item-search/item.service';
import {BrandSearchParams, BrandService} from '../brand-price-list/brand.service';
import {
  CustomerListResponse,
  ExportQueryParams,
  HasExport, HasPaging, HasSorting,
  PageQueryParams, PriceList, RestrictSearch, ShipLocationResponse, SortQueryParams
} from '../models';
import {
  ShipLocationSearchParams, ShipLocationsService
} from '../customer-item-pricing/ship-locations.service';
import {CustomersService} from '../customer-item-pricing/customers.service';
import {ItemPriceListService} from '../item-price-list/item-price-list.service';
import {ItemPriceListSearchParams} from '../item-price-list/item-price-list-search-params';
import {BrandPriceListSearchParams} from '../brand-price-list/brand-price-list-search-params';

export interface GridData {
  total: number;
  data: {[key: string]: any}[]

  headers?: {
    columnId: string
    text: string,
  }[]
}

@Injectable()
export class GridDataService {

  constructor(private itemService: ItemService,
              private brandService: BrandService,
              private shipLocationsService: ShipLocationsService,
              private customerService: CustomersService,
              private itemPriceListService: ItemPriceListService) {
  }

  public getData(config: GridDataConfiguration): Observable<GridData | Blob> {

    if (config.tableName === 'itemGrid') {
      return this.getItemData(config);
    } else if (config.tableName === 'brandGrid') {
      return this.getBrandData(config);
    } else if (config.tableName === 'brandPriceListGrid') {
      return this.getBrandPriceListData(config);
    } else if (config.tableName === 'shipLocGrid') {
      return this.getShipLocationData(config);
    } else if (config.tableName === 'customerGrid') {
      return this.getCustomerData(config);
    } else if (config.tableName === 'itemPriceListGrid') {
      return this.getPriceListData(config);
    }

    return Observable.of<GridData>({data: [], total: 0}).delay(1000);
  }

  private getItemData(config: GridDataConfiguration): Observable<GridData | Blob> {
    const query: ItemSearchParams = {
      restrictSearch: RestrictSearch.No
    };

    this.assignCommon(query, config);

    if (query.exportData) {
      return this.itemService.getItemsReport(query);
    }

    return this.itemService.getItems(query).map((response: ItemListResponse) => {
      return <GridData>{total: response.total, data: response.data};
    });
  }

  private getBrandData(config: GridDataConfiguration): Observable<GridData | Blob> {
    const query: BrandSearchParams = {
      restrictSearch: RestrictSearch.No
    };

    this.assignCommon(query, config);

    if (query.exportData) {
      return this.brandService.getBrandsReport(query);
    }

    return this.brandService.getBrands(query)
      .map(x => {
        return <GridData>{total: x.total, data: x.data};
      });
  }

  private getShipLocationData(config: GridDataConfiguration): Observable<GridData | Blob> {
    const query: ShipLocationSearchParams = {
      restrictSearch: RestrictSearch.No
    };

    this.assignCommon(query, config);

    if (query.exportData) {
      return this.shipLocationsService.getShipLocationsReport(query);
    }

    return this.shipLocationsService.getShipLocations(query)
      .map((x: ShipLocationResponse) => {
        return <GridData>{total: x.total, data: x.data};
      });
  }

  private getCustomerData(config: GridDataConfiguration): Observable<GridData | Blob> {
    const query: BrandSearchParams = {};

    this.assignCommon(query, config);

    if (query.exportData) {
      return this.customerService.getCustomersReport(query);
    }

    return this.customerService.getCustomers(query)
      .map((x: CustomerListResponse) => {
        return <GridData>{total: x.total, data: x.data};
      });
  }

  private getBrandPriceListData(config: GridDataConfiguration): Observable<GridData | Blob> {

    const query: BrandPriceListSearchParams = <any>{};

    this.assignCommon(query, config);

    if (query.exportData) {
      return this.brandService.getBrandPriceListReport(query);
    }

    return this.brandService.getBrandPriceList(query)
      .map((response: PriceList) => {
        return <GridData>{
          total: response.total,
          data: response.data.map((columnRow, i) => {
            return columnRow.reduce((r, e) => {
              r[e.columnId] = e.value;
              return r;
            }, {});
          }),
          headers: response.headers.map(x => {
            return {columnId: x.columnId, text: x.displayName};
          })
        };
      });
  }

  private getPriceListData(config: GridDataConfiguration): Observable<GridData | Blob> {

    const query: ItemPriceListSearchParams = <any>{};

    this.assignCommon(query, config);

    if (query.exportData) {
      return this.itemPriceListService.getPriceListReport(query);
    }

    return this.itemPriceListService.getPriceList(query)
      .map((response: PriceList) => {
        return <GridData>{
          total: response.total,
          data: response.data.map((columnRow, i) => {
            return columnRow.reduce((r, e) => {
              r[e.columnId] = e.value;
              return r;
            }, {});
          }),
          headers: response.headers.map(x => {
            return {columnId: x.columnId, text: x.displayName};
          })
        };
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
    }
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
