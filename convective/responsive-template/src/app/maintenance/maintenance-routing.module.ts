import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MaintenanceComponent} from './maintenance.component';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';
import {CreateRowComponent} from './create-row/create-row.component';

const routes: Routes = [
  {path: '', component: MaintenanceComponent, children: []},
  {path: 'new', component: CreateRowComponent, children: []},
  {path: 'edit', component: CreateRowComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MaintenanceRoutingModule {
}
