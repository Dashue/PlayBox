import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {WjGridModule} from 'wijmo/wijmo.angular2.grid';
import {PdwRoutingModule} from './pdw-routing.module';
import {ItemSearchComponent} from './item-search/item-search.component';
import {DataService} from './data.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PdwRoutingModule,
    WjGridModule
  ],
  declarations: [
    ItemSearchComponent
  ],
  providers: [DataService]
})
export class PdwModule { }
