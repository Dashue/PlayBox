import {Component, EventEmitter, Inject} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ObservableMedia} from '@angular/flex-layout';
import {MD_DIALOG_DATA} from '@angular/material';
import {UploadFile, UploadInput, UploadOutput, UploadStatus} from 'ngx-uploader'
import {FileService} from './file.service';

export interface FileUploadConfig {
  enableDropArea: boolean;
  enableMultipleFiles: boolean;
  displayConcurrencyInput: boolean;
  displayAutoUpload: boolean;
  autoUpload: boolean;
}

@Component({
  selector: 'hfc-file-upload-dialog',
  templateUrl: './file-upload.dialog.html',
  styleUrls: ['./file-upload.dialog.scss']
})
export class FileUploadDialog {
  formData: FormGroup;
  public files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  dragOver: boolean;

  public get showStartUpload(): boolean {
    return !!this.files.find(x => x.progress.status === UploadStatus.Queue)
  }

  public get showDropArea(): boolean {return this.enableDropArea && !this.media.isActive('xs')};
  private get autoUpload(): boolean {return this.formData.controls['autoUpload'].value};
  private get concurrency(): number {return this.formData.controls['concurrency'].value};

  public enableMultipleFiles: boolean;
  public displayConcurrencyInput: boolean;
  public displayAutoUpload: boolean;
  private enableDropArea: boolean;

  constructor(fb: FormBuilder,
              private fileService: FileService,
              private media: ObservableMedia,
              @Inject(MD_DIALOG_DATA) config: FileUploadConfig) {
    this.enableDropArea = config.enableDropArea;
    this.enableMultipleFiles = config.enableMultipleFiles;
    this.displayConcurrencyInput = config.displayConcurrencyInput;
    this.displayAutoUpload = config.displayAutoUpload;

    this.formData = fb.group({
      autoUpload: config.autoUpload,
      concurrency: 0,
    });

    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output);
    if (output.type === 'allAddedToQueue') {
      if (this.autoUpload) {
        this.startUpload();
      }
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file);
    } else if (output.type === 'uploading') {
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  public startUpload(): void {

    this.files.forEach(file => {
      this.uploadInput.emit({
        type: 'uploadFile',
        url: this.fileService.fileUrl,
        method: 'POST',
        headers: {'X-APIKEY': this.fileService.apiKeyOverride},
        data: {
          FILE_NAME: 'My category',
          FILE_NUM: '1',
          fileUpload0_name: file.name
        },
        concurrency: this.concurrency,
        file: file,
        fieldName: 'fileUpload0'
      });
    });
  }

  public cancelUpload(file: UploadFile): void {
    this.uploadInput.emit({type: 'cancel', id: file.id});
  }

  public removeFile(file: UploadFile): void {
    this.uploadInput.emit({type: 'remove', id: file.id});
  }

  public removeAllFiles(): void {
    this.uploadInput.emit({type: 'removeAll'});
  }

  public humanizeBytes(bytes: number): string {
    if (bytes === 0) {
      return '0 Byte';
    }

    const k = 1024;
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
