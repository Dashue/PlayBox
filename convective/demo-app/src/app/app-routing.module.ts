import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BlankComponent} from './blank/blank.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'blank', component: BlankComponent, children: []},
  {path: 'maintenance', loadChildren: './maintenance/maintenance.module#MaintenanceModule'},
  {path: 'pdw', loadChildren: './pdw/pdw.module#PdwModule'},
  {path: 'search-panel-demo', loadChildren: './search-panel/search-panel.module#SearchPanelModule'},
  {path: 'grid-demos', loadChildren: './grid/grid-demos.module#GridDemosModule'},
  {path: 'file-upload-demo', loadChildren: './file-upload/file-upload.module#FileUploadModule'},
  {path: '**', component: PageNotFoundComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
