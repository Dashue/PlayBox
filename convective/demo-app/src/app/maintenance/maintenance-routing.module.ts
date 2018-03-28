import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MaintenanceComponent} from './maintenance.component';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';

// TODO route 'new' path to a new EditRowComponent instead of the DynamicFormComponent
const routes: Routes = [
  {path: '', component: MaintenanceComponent, children: []},
  {path: 'new', component: DynamicFormComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MaintenanceRoutingModule {}
