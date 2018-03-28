import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {UploadOutput} from 'ngx-uploader';

@Component({
  selector: 'hfc-file-select-button',
  templateUrl: './file-select-button.component.html'
})

export class FileSelectButtonComponent {
  @ViewChild('inputFile') inputElement: ElementRef;

  @Input() uploadInput: EventEmitter<any>;
  @Input() multiple: boolean;
  @Output() uploadOutput: EventEmitter<UploadOutput>;

  constructor() {
    this.uploadOutput = new EventEmitter<UploadOutput>();
  }

  public onUploadOutput(event) {
    this.uploadOutput.emit(event);
  }

  selectFile() {
    this.inputElement.nativeElement.click();
  }
}
