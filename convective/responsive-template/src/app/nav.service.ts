import {EventEmitter, Injectable} from '@angular/core';
import {Location as NgLocation} from '@angular/common';
import {ConfigService} from './config.service';

@Injectable()
export class NavService {
  public selectItem: EventEmitter<void> = new EventEmitter<void>();
  public appDrawer: any;
  private _isBackEnabled: boolean = false;
  private _showSelectItem: boolean = false;
  private _title: string;

  constructor(private ngLocation: NgLocation,
              private configService: ConfigService) {
    this._title = configService.appName;
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public goBack() {
    this.ngLocation.back();
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

  get showSelectItem(): boolean {
    return this._showSelectItem;
  }

  set showSelectItem(value: boolean) {
    this._showSelectItem = value;
  }
}
