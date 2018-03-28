import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {ObservableMedia} from '@angular/flex-layout';
import {Column} from 'wijmo/wijmo.grid';
import {CheckboxModel} from '../models/checkBoxModel';

@Component({
  selector: 'hfc-column-picker',
  templateUrl: './column-picker.component.html',
  styleUrls: ['./column-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColumnPickerComponent {
  public values: CheckboxModel[] = [];

  constructor(private dialogRef: MdDialogRef<ColumnPickerComponent>,
              @Inject(MD_DIALOG_DATA) columns: Column[],
              public media: ObservableMedia) {
    if (columns) {
      columns.forEach((value: Column, index: number, values: Column[]) => {
        this.values.push({name: value.name, isChecked: value.isVisible});
      });
    }
  }

  public close() {
    const result: string[] = [];

    this.values.forEach((value: CheckboxModel, index: number, values: CheckboxModel[]) => {
      if (value.isChecked) {
        result.push(value.name);
      }
    });

    this.dialogRef.close(result);
  }

  public click(item: CheckboxModel) {
    item.isChecked = !item.isChecked;
    return false;
  }
}
