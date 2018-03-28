import {Component, OnInit} from '@angular/core';
import {NavService} from '../nav.service';
import {NavItem} from '../models/NavItem';
import {AuthService} from '../auth.service';
import {ObservableMedia} from '@angular/flex-layout';
import {Router} from '@angular/router';

@Component({
  selector: 'hfc-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  navItems: NavItem[];

  constructor(public navService: NavService,
              public authService: AuthService,
              public media: ObservableMedia,
              public router: Router) {}

  ngOnInit() {
    this.navItems = this.navService.navItems;
  }
}
