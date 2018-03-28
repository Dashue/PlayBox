import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ExampleMaterialModule} from './material-module';
import {WjGridModule} from 'wijmo/wijmo.angular2.grid';

export interface LiveExample {
  title: string;
  component: any;
  additionalFiles?: string[];
  selectorName?: string;
}

import {FlexGridOverviewExample} from './flexgrid-overview/flexgrid-overview-example';
import {FlexGridExample} from './flexgrid/flexgrid-example';

export const HFC_EXAMPLE_COMPONENTS = {
  'flexgrid-overview': {
    title: 'FlexGrid Overview',
    component: FlexGridOverviewExample,
    additionalFiles: null,
    selectorName: null
  },
  'flexgrid': {
    title: 'FlexGrid',
    component: FlexGridExample,
    additionalFiles: null,
    selectorName: null
  }
};

export const EXAMPLE_LIST = [
  FlexGridOverviewExample,
  FlexGridExample
];

@NgModule({
  declarations: EXAMPLE_LIST,
  entryComponents: EXAMPLE_LIST,
  imports: [
    ExampleMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    WjGridModule
  ]
})
export class HfcExampleModule { }
