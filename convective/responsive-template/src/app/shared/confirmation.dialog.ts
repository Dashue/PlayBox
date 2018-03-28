import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'hfc-confirmation-dialog',
  templateUrl: './confirmation.dialog.html',
  styleUrls: ['./confirmation.dialog.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialog {
  public title: string;
  public message: string;

  constructor(private dialogRef: MatDialogRef<ConfirmationDialog>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
    this.title = data.title;
    this.message = data.message;
  }

  public close(result: boolean) {
    this.dialogRef.close(result);
  }
}
