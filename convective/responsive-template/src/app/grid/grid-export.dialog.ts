import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

type fileType = 'xls' | 'pdf';
type exportType = 'currentPage' | 'allPages';

export interface GridExportDialogResult {
  fileType: fileType;
  exportType: exportType;
}

@Component({
  selector: 'hfc-grid-export-dialog',
  templateUrl: './grid-export.dialog.html',
  styleUrls: ['./grid-export.dialog.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridExportDialog {
  public exportForm: FormGroup;
  private selectedFileType: FormControl;
  private selectedExportType: FormControl;

  public fileTypes: {name: string, value: fileType}[] = [
    {name: 'PDF', value: 'pdf'},
    {name: 'Excel', value: 'xls'}
  ];

  public exportTypes: {name: string, value: exportType}[] = [
    {name: 'Current Page', value: 'currentPage'},
    {name: 'All Records', value: 'allPages'}
  ];

  constructor(fb: FormBuilder,
              private dialog: MatDialogRef<GridExportDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (!data.allowExportAllRecords) {
      this.exportTypes = [this.exportTypes[0]];
    }

    this.selectedFileType = fb.control(this.fileTypes[0].value, Validators.required);
    this.selectedExportType = fb.control({
      value: this.exportTypes[0].value,
      disabled: this.exportTypes.length < 2
    }, Validators.required);

    this.exportForm = fb.group({
      fileType: this.selectedFileType,
      exportType: this.selectedExportType
    });
  }

  public close() {
    this.selectedExportType.markAsTouched();
    this.selectedFileType.markAsTouched();

    if (this.exportForm.invalid) {
      return;
    }

    const result: GridExportDialogResult = {
      fileType: this.selectedFileType.value,
      exportType: this.selectedExportType.value
    };

    this.dialog.close(result);
  }
}
