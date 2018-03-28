import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule, MATERIAL_COMPATIBILITY_MODE, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';

import './rxjs.extensions';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavService} from './nav.service';
import {AuthService} from './auth.service';
import {ConfigService} from './config.service';
import {DateService} from './shared/date.service';
import {TopNavComponent} from './top-nav/top-nav.component';
import {MenuItemComponent} from './menu-item/menu-item.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TopNavComponent,
    MenuItemComponent
  ],
  providers: [
    NavService,
    AuthService,
    ConfigService,
    DateService,
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
