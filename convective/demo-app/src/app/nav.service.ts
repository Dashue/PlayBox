import {Injectable} from '@angular/core';
import {Location as NgLocation} from '@angular/common';
import {Router} from '@angular/router';
import {NavItem} from './models/NavItem';
import * as config from '../config.json';

@Injectable()
export class NavService {
  public appDrawer: any;
  private _isBackEnabled: boolean = false;
  private _appName: string;
  private _title: string;
  private _logoPath: string;
  private _navItems: NavItem[];

  constructor(private ngLocation: NgLocation, private router: Router) {
    this._navItems = (<any>config).navItems;
    this._appName = (<any>config).appName;
    this._title = this._appName;
    this._logoPath = (<any>config).logoPath;
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public goBack() {
    const path = this.ngLocation.path();
    this.ngLocation.back();

    // Fallback to landing page if the user arrived directly to a page like a listing
    if (path === this.ngLocation.path()) {
      this.router.navigate(['']);
    }
  }

  get isBackEnabled(): boolean {
    return this._isBackEnabled;
  }

  set isBackEnabled(value: boolean) {
    this._isBackEnabled = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get logoPath(): string {
    return this._logoPath;
  }

  set logoPath(value: string) {
    this._logoPath = value;
  }

  get navItems(): NavItem[] {
    return this._navItems;
  }

  get appName(): string {
    return this._appName;
  }
}
