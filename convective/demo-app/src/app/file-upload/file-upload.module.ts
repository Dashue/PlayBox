import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {NgUploaderModule} from 'ngx-uploader';

import {SharedModule} from '../shared/shared.module';
import {FileUploadRoutingModule} from './file-upload-routing.module';
import {FileUploadDemoComponent} from './file-upload-demo.component';
import {FileUploadComponent} from './file-upload.component';
import {FileUploadDialog} from './file-upload.dialog';
import {FileService} from './file.service';
import {FileSelectButtonComponent} from './file-select-button.component'

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpModule,
    NgUploaderModule,
    FileUploadRoutingModule
  ],
  declarations: [
    FileUploadDemoComponent,
    FileUploadComponent,
    FileUploadDialog,
    FileSelectButtonComponent
  ],
  exports: [
    FileUploadComponent
  ],
  providers: [FileService],
  entryComponents: [FileUploadDialog]
})
export class FileUploadModule {}


