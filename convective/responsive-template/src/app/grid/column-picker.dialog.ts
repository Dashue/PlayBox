import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ObservableMedia} from '@angular/flex-layout';
import {Column} from 'wijmo/wijmo.grid';
import {CheckboxModel} from '../models/checkbox-model';

@Component({
  selector: 'hfc-column-picker',
  templateUrl: './column-picker.dialog.html',
  styleUrls: ['./column-picker.dialog.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColumnPickerDialog {
  public values: CheckboxModel[] = [];
  private headerToColumnNameMap = {};

  constructor(private dialogRef: MatDialogRef<ColumnPickerDialog>,
              @Inject(MAT_DIALOG_DATA) columns: Column[],
              public media: ObservableMedia) {
    if (columns) {
      columns.forEach((value: Column, index: number, values: Column[]) => {
        this.headerToColumnNameMap[value.header] = value.name;
        this.values.push({name: value.header, isChecked: value.isVisible});
      });
    }
  }

  public close() {
    const result: string[] = [];

    this.values.forEach((value: CheckboxModel, index: number, values: CheckboxModel[]) => {
      if (value.isChecked) {
        result.push(this.headerToColumnNameMap[value.name]);
      }
    });

    this.dialogRef.close(result);
  }

  public click(item: CheckboxModel) {
    item.isChecked = !item.isChecked;
    return false;
  }
}
