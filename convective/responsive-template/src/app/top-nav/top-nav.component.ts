import {Component, OnInit} from '@angular/core';
import {NavService} from '../nav.service';
import {NavItem} from '../models/nav-item';
import {AuthService} from '../auth.service';
import {environment} from '../../environments/environment';
import {ObservableMedia} from '@angular/flex-layout';
import {Router} from '@angular/router';
import {ConfigService} from '../config.service';

@Component({
  selector: 'hfc-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  navItems: NavItem[];
  environmentName: string;

  constructor(public navService: NavService,
              public configService: ConfigService,
              public authService: AuthService,
              public media: ObservableMedia,
              public router: Router) {
    this.environmentName = environment.environmentName;
  }

  ngOnInit() {
    this.navItems = this.configService.navItems;
  }

  selectItem() {
    this.navService.selectItem.emit();
  }
}
