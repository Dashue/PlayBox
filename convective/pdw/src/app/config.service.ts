import {Injectable} from '@angular/core';
import * as config from '../config.json';
import {NavItem} from './models/nav-item';
import {GridGroup} from './models/grid-group';

@Injectable()
export class ConfigService {
  private _appName: string;
  private _logoPath: string;
  private _navItems: NavItem[];
  private _maintenanceGrids: GridGroup[];
  private _applicationId: string;
  private _roleToChangeDefaultSelection: string;

  constructor() {
    this._navItems = (<any>config).navItems;
    this._appName = (<any>config).appName;
    this._logoPath = (<any>config).logoPath;
    this._maintenanceGrids = (<any>config).maintenanceGrids;
    this._applicationId = (<any>config).applicationId;
    this._roleToChangeDefaultSelection = (<any>config).roleToChangeDefaultSelection;
  }

  get logoPath(): string {
    return this._logoPath;
  }
  set logoPath(value: string) {
    this._logoPath = value;
  }
  get maintenanceGrids(): GridGroup[] {
    return this._maintenanceGrids;
  }
  get navItems(): NavItem[] {
    return this._navItems;
  }
  get appName(): string {
    return this._appName;
  }

  get applicationId(): string {
    return this._applicationId
  }

  get roleToChangeDefaultSelection(): string {
    return this._roleToChangeDefaultSelection;
  }
}
