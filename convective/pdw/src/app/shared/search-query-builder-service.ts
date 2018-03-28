import {
  ExportQueryParams, HasExport, HasPaging, HasSorting, PageQueryParams, SortQueryParams
} from '../models';

export class SearchQueryBuilderService {

  public static build<T extends HasExport & HasPaging & HasSorting>(
    params: {},
    config: T
  ) {
    Object.assign(params, SearchQueryBuilderService.buildPaging(config.paging));
    Object.assign(params, SearchQueryBuilderService.buildSorting(config.sorting));
    Object.assign(params, SearchQueryBuilderService.buildExport(config.exportData));

    return Object.keys(params).map(function (key) {
      return key + '=' + params[key];
    }).join('&');
  }

  private static buildExport(query: ExportQueryParams): object {
    const params = {};
    if (query) {
      if (query.outputPageSize && query.outputType && query.configurationId && query.gridName) {
        params['pageSize'] = query.outputPageSize;
        params['outputType'] = query.outputType;
        params['exportConfigurationID'] = query.configurationId;
        params['gridName'] = query.gridName;
      }
    }

    return params;
  }

  private static buildPaging(paging: PageQueryParams): {} {
    const params = {};

    if (paging) {
      if (paging.page) {
        params['page'] = paging.page;
      }
      if (paging.pageSize) {
        params['pageSize'] = paging.pageSize;
      }
    }
    return params;
  }

  private static buildSorting(item: SortQueryParams): {} {
    const params = {};

    if (item) {
      if (item.sortColumns && item.sortColumns.length) {
        params['gridSortColumn'] = item.sortColumns.join(',');
      }
      if (item.sortDirections && item.sortDirections.length) {
        params['gridSortDirection'] = item.sortDirections.join(',');
      }
    }
    return params;
  }
}
