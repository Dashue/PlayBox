import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthService} from './auth.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: './auth/auth.module#AuthModule'},
  {
    path: 'maintenance', loadChildren: './maintenance/maintenance.module#MaintenanceModule',
    canActivate: [AuthService]
  },
  {path: '**', component: PageNotFoundComponent, children: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
