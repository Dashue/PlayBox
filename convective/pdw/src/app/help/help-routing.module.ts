import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HelpComponent} from './help.component';
import {AuthService} from '../auth.service';

const routes: Routes = [
  {path: '', component: HelpComponent, children: [], canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HelpRoutingModule {}
