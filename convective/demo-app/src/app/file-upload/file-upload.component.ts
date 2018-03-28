import {Component, Input, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material'
import {FileUploadConfig, FileUploadDialog} from './file-upload.dialog';

@Component({
  selector: 'hfc-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() enableDropArea: boolean = true;
  @Input() enableMultipleFiles: boolean = true;
  @Input() displayConcurrencyInput: boolean = false;
  @Input() displayAutoUpload: boolean = false;
  @Input() autoUpload: boolean = true;

  constructor(private dialog: MdDialog) {}

  ngOnInit() {}

  public openDialog() {
    const data: FileUploadConfig = {
      enableDropArea: this.enableDropArea,
      enableMultipleFiles: this.enableMultipleFiles,
      displayConcurrencyInput: this.displayConcurrencyInput,
      displayAutoUpload: this.displayAutoUpload,
      autoUpload: this.autoUpload
    };

    this.dialog.open(FileUploadDialog, {data: data});
  }
}
