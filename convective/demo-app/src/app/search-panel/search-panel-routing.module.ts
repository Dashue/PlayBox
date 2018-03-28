import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchPanelDemoComponent} from './search-panel-demo.component';

const routes: Routes = [
  {path: '', component: SearchPanelDemoComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SearchPanelRoutingModule {}
