import {DocViewer} from './doc-viewer';
import {ExampleViewer} from '../example-viewer/example-viewer';
import {
  MdButtonModule,
  MdIconModule,
  MdTabsModule,
  MdTooltipModule,
  PortalModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';


// ExampleViewer is included in the DocViewerModule because they have a circular dependency.
@NgModule({
  imports: [
    MdButtonModule,
    MdIconModule,
    MdTooltipModule,
    MdTabsModule,
    CommonModule,
    PortalModule
  ],
  declarations: [DocViewer, ExampleViewer],
  entryComponents: [ExampleViewer],
  exports: [DocViewer, ExampleViewer],
})
export class DocViewerModule { }
