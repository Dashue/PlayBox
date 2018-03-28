import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FileUploadDemoComponent} from './file-upload-demo.component';

const routes: Routes = [
  {path: '', component: FileUploadDemoComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FileUploadRoutingModule {}
