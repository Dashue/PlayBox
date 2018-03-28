import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import {NavService} from './nav.service';
import {AuthService} from './auth.service';
import {ObservableMedia} from '@angular/flex-layout';
import {NavItem} from './models/NavItem';

@Component({
  selector: 'hfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  navItems: NavItem[];

  constructor(public navService: NavService,
              public authService: AuthService,
              public media: ObservableMedia) {}

  ngOnInit() {
    this.navItems = this.navService.navItems;
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  logout() {
    this.navService.closeNav();
    this.authService.logout();
  }
}
