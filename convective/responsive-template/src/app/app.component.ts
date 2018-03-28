import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import {NavService} from './nav.service';
import {AuthService} from './auth.service';
import {environment} from '../environments/environment';
import {ObservableMedia} from '@angular/flex-layout';
import {NavItem} from './models/nav-item';
import {ConfigService} from './config.service';

@Component({
  selector: 'hfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  navItems: NavItem[];
  environmentName: string;

  constructor(private navService: NavService,
              private configService: ConfigService,
              public authService: AuthService,
              public media: ObservableMedia) {
    this.environmentName = environment.environmentName;
  }

  ngOnInit() {
    this.authService.UserLoggedIn.subscribe(user => {
      if (!user) {
        return;
      }

      const items = this.configService.navItems;
      this.navItems = [];
      items.forEach((item: NavItem) => {
        /* Authorize parent route */
        if (this.authService.hasRequiredRoles(item)) {

          /* Authorize child routes */
          if (item.children && item.children.length > 0) {
            item.children = item.children.filter(child => this.authService.hasRequiredRoles(child));

            if (item.children.length > 0) {
              /* If parent has children, only add if at least 1 child is authorized
               * To prevent empty items without children
               */
              this.navItems.push(item);
            }
          } else {
            /* Parents without any children gets displayed */
            this.navItems.push(item);
          }
        }
      });
    });
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  logout() {
    this.navService.closeNav();
    this.authService.logout();
  }
}
