import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ColumnSizingComponent} from './column-sizing.component';
import {ColumnOrderingComponent} from './column-ordering.component';

const routes: Routes = [
  {path: 'column-ordering', component: ColumnOrderingComponent, children: []},
  {path: 'column-sizing', component: ColumnSizingComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GridDemosRoutingModule {}
