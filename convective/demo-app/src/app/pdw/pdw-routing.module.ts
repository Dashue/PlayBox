import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemSearchComponent} from './item-search/item-search.component';

const routes: Routes = [
  {path: '', redirectTo: 'item-search'},
  {path: 'item-search', component: ItemSearchComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PdwRoutingModule {}
