import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule, MediaService} from '@angular/flex-layout';
import {MdButtonModule, MdIconModule, MdListModule, MdMenuModule, MdSidenavModule, MdTabsModule,
        MdToolbarModule} from '@angular/material';

import './rxjs.extensions';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavService} from './nav.service';
import {AuthService} from './auth.service';
import {ConfigService} from './config.service';
import {TopNavComponent} from './top-nav/top-nav.component';
import {MenuItemComponent} from './menu-item/menu-item.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdListModule,
    MdTabsModule,
    MdMenuModule,
    MdButtonModule,
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
    MediaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
