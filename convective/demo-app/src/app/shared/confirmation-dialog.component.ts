import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

export interface ConfirmDialogData {
  title: string,
  message: string
}
@Component({
  selector: 'hfc-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent {
  public title: string;
  public message: string;

  constructor(private dialogRef: MdDialogRef<ConfirmationDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: ConfirmDialogData) {
    this.title = data.title;
    this.message = data.message;
  }

  public close(result: boolean) {
    this.dialogRef.close(result);
  }
}
