import {Injectable} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {ExportMetadata, GridConfiguration, outputType} from '../models';
import {GridExportDialog, GridExportDialogResult} from './grid-export.dialog';
import {GridConfigurationService} from './grid-configuration.service';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcXlsx from 'wijmo/wijmo.xlsx';
import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
import {GridDataService} from './grid-data.service';
import {GridComponent} from './grid.component';
import * as platform from 'platform';

@Injectable()
export class GridExportService {

  constructor(private dialog: MdDialog,
              private gridConfigurationService: GridConfigurationService,
              private gridDataService: GridDataService) {
  }

  public gridExport(currentConfig: GridConfiguration,
                    lastSelectedConfig: GridConfiguration,
                    isServerExport: boolean): Observable<ExportMetadata> {
    return this.dialog.open(GridExportDialog,
      {
        panelClass: 'gridExportDialog',
        width: '300px',
        data: {
          allowExportAllRecords: isServerExport
        }
      })
      .afterClosed()
      .filter(result => !!result)
      .flatMap((result: GridExportDialogResult) => {
        if (isServerExport) {
          return this.getExportConfigId(currentConfig, lastSelectedConfig)
            .map((exportConfigId: number) => {
              if (!(exportConfigId > 0)) {
                throw new Error('Invalid export config id');
              }

              return {
                exportConfigId: exportConfigId,
                outputPageSize: this.getOutputPageSize(result, currentConfig.pageSize),
                outputType: this.getOutputType(result)
              };
            });
        } else {
          // Don't create a temporary Grid Config for the server-side export to use since
          // we're doing a client-side export.
          return Observable.of({
            exportConfigId: null,
            outputPageSize: this.getOutputPageSize(result, currentConfig.pageSize),
            outputType: this.getOutputType(result)
          });
        }
      });
  }

  public downloadFile(blob: any) {
    const url = (window.URL || window['webkitURL']);
    const anchor = document.createElement('a');
    anchor.download = blob.name;
    // Blob URL creation (http://caniuse.com/#feat=bloburls) has wide browser support.
    anchor.href = url.createObjectURL(blob, {type: blob.type});
    document.body.appendChild(anchor);
    anchor.click();
    // Clean up
    document.body.removeChild(anchor);
    url.revokeObjectURL(anchor.href);
  }

  private getExportConfigId(config: GridConfiguration,
                            lastSelectedConfig: GridConfiguration): Observable<number> {
    if (GridConfiguration.equals(config, lastSelectedConfig)) {
      return Observable.of(config.id);
    }

    // Current config has changed from when it was last selected,
    // create a temporary config and use that config's id.
    const tempConfig = Object.assign({}, config);
    tempConfig.id = 0;
    tempConfig.temporaryConfiguration = true;
    tempConfig.name = 'Temporary Export Configuration';
    tempConfig.isUserDefault = false;
    tempConfig.isDefault = false;
    return this.gridConfigurationService.saveConfiguration(tempConfig)
      .map((response: GridConfiguration) => {
        return response.id;
      });
  }

  private getOutputPageSize(value: GridExportDialogResult, configPageSize: number): string {
    let outputPageSize: string;

    if (value.exportType === 'allPages') {
      outputPageSize = 'ALL';
    } else if (value.exportType === 'currentPage') {
      outputPageSize = String(configPageSize);
    } else {
      throw new Error(`Unknown page size: ${value.exportType}`);
    }

    return outputPageSize;
  }

  private getOutputType(value: GridExportDialogResult): outputType {
    let exportType: outputType;

    if (value.fileType === 'pdf') {
      exportType = 'application/pdf';
    } else if (value.fileType === 'xls') {
      exportType = 'application/vnd.ms-excel';
    } else {
      throw new Error(`Unknown file type: ${value.fileType}`);
    }

    return exportType;
  }

  /**
   * Export open a dialog to export the current grid's data.
   * If running on iOS or Android, only allow for exporting of the current page via Wijmo.
   * If running on another platform (assuming desktop), then request to download the export from the server.
   * @param {GridComponent} gridComponent
   */
  public exportFile(gridComponent: GridComponent) {
    if (platform.os.family.indexOf('iOS') !== -1 ||
        platform.os.family.indexOf('Android') !== -1) {
      this.exportDataFromClient(gridComponent);
    } else {
      this.exportDataFromServer(gridComponent);
    }
  }

  /**
   * Ask the grid's data API to return a blob containing the desired export contents.
   * Currently the server is not capable of returning an Excel data format that works on anything but Windows.
   * Thus this should only be called when running on Microsoft Windows.
   * @param {GridComponent} gridComponent
   */
  private exportDataFromServer(gridComponent: GridComponent) {
    const currentConfig = gridComponent.instanceService.getCurrentConfig();
    this.updateGridConfigVisibleColumns(gridComponent, currentConfig);

    this.gridExport(currentConfig, gridComponent.lastSelectedConfig, true)
      .flatMap((data: ExportMetadata) => {
        const dataConfig = gridComponent.getGridDataConfig(currentConfig, data);
        return this.gridDataService.getData(dataConfig);
      })
      .subscribe((report: Blob) => {
        this.downloadFile(report);
      }, (error) => {
        console.error(error);
      });
  }

  private exportDataFromClient(gridComponent: GridComponent) {
    const currentConfig = gridComponent.instanceService.getCurrentConfig();
    this.updateGridVisibleColumns(gridComponent, currentConfig);

    this.gridExport(currentConfig, gridComponent.lastSelectedConfig, false)
      .subscribe((data: ExportMetadata) => {
        const dataConfig = gridComponent.getGridDataConfig(currentConfig, data);
        if (dataConfig.exportConfig.outputType.indexOf('excel') !== -1) {
          this.exportExcel(gridComponent, currentConfig);
        } else if (dataConfig.exportConfig.outputType.indexOf('pdf') !== -1) {
          this.exportPdf(gridComponent, currentConfig);
        } else {
          console.error(`Unsupported outputType specified.`);
        }
      });
  }

  private exportExcel(gridComponent: GridComponent, currentConfig: GridConfiguration) {
    // Note that using this asynchronous save method requires JSZip 3.x
    // More details here: https://www.grapecity.com/en/forums/wijmo/export-flex-grid-to-excel-_1
    wjcGridXlsx.FlexGridXlsxConverter.saveAsync(gridComponent.grid, {
        includeColumnHeaders: true,
        includeCellStyles: true,
        formatItem: this.exportFormatItem,
        includeColumns: function (column) {
          return column.binding === column.binding;
        }
      },
      `${currentConfig.gridName}Export.xlsx`,
      ((base64: string) => {
        console.log(`Saved Excel export.`);
      }), error => {
        console.error(`Failed to save Excel export: ${error}`);
      });

    this.updateGridHiddenColumns(gridComponent, currentConfig);
  }

  private exportFormatItem(args: wjcGridXlsx.XlsxFormatItemEventArgs) {
    const p = args.panel;
    const row = args.row;
    const col = args.col;
    const xlsxCell = args.xlsxCell;
    let cell: HTMLElement;

    if (p.cellType === wjcGrid.CellType.Cell) {
      if (p.columns[col].binding === 'color') {
        if (xlsxCell.value) {
          if (!xlsxCell.style.font) {
            xlsxCell.style.font = {};
          }
          xlsxCell.style.font.color = (<string>xlsxCell.value).toLowerCase();
        }
      } else if (p.columns[col].binding === 'active' && p.rows[row] instanceof wjcGrid.GroupRow) {
        cell = args.getFormattedCell();
        xlsxCell.value = cell.textContent.trim();
        xlsxCell.style.hAlign = wjcXlsx.HAlign.Left;
      }
    }
  }

  public exportPdf(gridComponent: GridComponent, currentConfig: GridConfiguration) {
    const pdfDocument = new wjcPdf.PdfDocument({
      header: {
        declarative: {
          text: '\t&[Page]\\&[Pages]'
        }
      },
      footer: {
        declarative: {
          text: '\t&[Page]\\&[Pages]'
        }
      },
      pageSettings: {
        layout: wjcPdf.PdfPageOrientation.Landscape,
        margins: {
          left: 5,
          right: 5,
          top: 5,
          bottom: 5
        }
      },
      ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
        wjcPdf.saveBlob(args.blob, `${currentConfig.gridName}Export.pdf`);
      }
    });

    wjcGridPdf.FlexGridPdfConverter.draw(gridComponent.grid, pdfDocument, null, null, {
      styles: {
        cellStyle: {
          backgroundColor: '#ffffff',
          borderColor: '#c6c6c6'
        },
        headerCellStyle: {
          backgroundColor: '#eaeaea'
        }
      }
    });
    pdfDocument.end();

    this.updateGridHiddenColumns(gridComponent, currentConfig);
  }

  /**
   * Change current grid config to include row detail columns, if they are enabled (xs screens).
   * We don't have to reverse this later because it only effects this config object and not the actual grid.
   * @param {GridComponent} gridComponent
   * @param {GridConfiguration} currentConfig
   */
  private updateGridConfigVisibleColumns(gridComponent: GridComponent, currentConfig: GridConfiguration) {
    if (gridComponent.showRowDetail) {
      currentConfig.columns.forEach(column => {
        if (gridComponent.rowDetailColumns.includes(column.name)) {
          column.visible = true;
        }
      });
    }
  }

  /**
   * Change the current grid to show row detail columns, if they are enabled (xs screens).
   * This is required because we're using Wijmo export which reads from the grid and not the config.
   * Make sure that updateGridHiddenColumns() is called after export is complete to reverse these changes.
   * @param {GridComponent} gridComponent
   * @param {GridConfiguration} currentConfig
   */
  private updateGridVisibleColumns(gridComponent: GridComponent, currentConfig: GridConfiguration) {
    if (gridComponent.showRowDetail) {
      currentConfig.columns.forEach(column => {
        if (gridComponent.rowDetailColumns.includes(column.name)) {
          gridComponent.grid.getColumn(column.name).visible = true;
        }
      });
    }
  }

  /**
   * Change the current grid to hide row detail columns, if they are enabled (xs screens).
   * This is required because we're using Wijmo export which reads from the grid and not the config.
   * This reverses what is done in updateGridVisibleColumns().
   * @param {GridComponent} gridComponent
   * @param {GridConfiguration} currentConfig
   */
  private updateGridHiddenColumns(gridComponent: GridComponent, currentConfig: GridConfiguration) {
    if (gridComponent.showRowDetail) {
      currentConfig.columns.forEach(column => {
        if (gridComponent.rowDetailColumns.includes(column.name)) {
          gridComponent.grid.getColumn(column.name).visible = false;
        }
      });
    }
  }
}
