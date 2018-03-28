import {NgModule} from '@angular/core';
import {HfcComponentsModule} from 'hfc-components/dist';
import {SharedModule} from '../shared.module';
import {ItemSearchComponent} from './item-search.component';
import {ItemSearchFormComponent} from './item-search-form/item-search-form.component';
import {StaticLookupsService} from '../../static-lookups.service';
import {GridModule} from '../../grid/grid.module';
import {LookupService} from '../lookup.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    HfcComponentsModule.forRoot(),
    GridModule
  ],
  declarations: [
    ItemSearchComponent,
    ItemSearchFormComponent
  ],
  exports: [
    ItemSearchComponent
  ],
  providers: [
    LookupService,
    StaticLookupsService
  ]
})
export class ItemSearchModule {}
