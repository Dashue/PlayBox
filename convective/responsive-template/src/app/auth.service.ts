import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../environments/environment';
import {ConfigService} from './config.service';
import {NavItem} from './models/nav-item';

@Injectable()
export class AuthService implements CanActivate {
  public UserLoggedIn: BehaviorSubject<User> = new BehaviorSubject(null);
  private authEndpoint = `${environment.apiServerUrl}/auth`;
  private currentUser: User;
  private _isLoggedIn: boolean = false;
  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public get firstName(): string {
    return this.currentUser ? this.currentUser.firstName : '';
  }

  public get apiKey(): string {
    return this.currentUser ? this.currentUser.apikey : '';
  }

  constructor(private router: Router,
              private http: HttpClient,
              private configService: ConfigService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this._isLoggedIn) {
      if (this.isLocalStorageSupported()) {
        const user: User = JSON.parse(localStorage.getItem('auth'));
        if (user) {
          this.currentUser = user;
          this._isLoggedIn = true;
          this.UserLoggedIn.next(this.currentUser);
        } else {
          this.router.navigate(['']);
        }
      } else {
        this.router.navigate(['']);
      }
    }

    const navConfig = this.findNavigationConfig(state);

    if (navConfig) {
      return this.hasRequiredRoles(navConfig);
    }

    /* Default to false */
    return false;
  }

  public login(appName: string, username: string, password: string): Observable<Object> {
    return this.http.post(this.authEndpoint, {
      'appname': appName,
      'userID': username,
      'password': password
    });
  }

  public logout() {
    this.currentUser = undefined;
    this._isLoggedIn = false;
    if (this.isLocalStorageSupported()) {
      localStorage.removeItem('auth');
    }
    this.router.navigate(['']);
  }

  public isInGroup(group: string): boolean {
    if (this.isLoggedIn) {
      return this.currentUser && this.currentUser.groups.indexOf(group) > -1;
    }

    return false;
  }

  public isInRole(role: string): boolean {
    if (!role) {
      /* When checking whether a user is in a specific role, when a role is empty
       * something has probably gone wrong and permission should be denied.
       */
      return false;
    }

    return this.currentUser && this.currentUser.roles.indexOf(role) > -1;
  }

  public isInRoles(roles: string[]): boolean {
    if (!roles || roles.length === 0 || !this.currentUser) {
      /* When checking whether a user is in a set of roles, if the set is empty
       * something has probably gone wrong and permission should be denied.
       */
      return false;
    }

    roles.map((role: string) => {
      if (this.isInRole(role)) {
        return true;
      }
    });

    return false;
  }

  public setLoggedInUser(user: User) {
    this.currentUser = user;
    this._isLoggedIn = true;

    if (this.isLocalStorageSupported()) {
      localStorage.setItem('auth', JSON.stringify(user));
    }

    this.UserLoggedIn.next(this.currentUser);
  }

  public canChangeDefaultConfiguration() {
    return this.isInRole(this.configService.roleToChangeDefaultSelection);
  }

  public hasRequiredRoles(item: NavItem): boolean {
    if (!item.requiredRoles || item.requiredRoles.length === 0) {
      return true;
    }

    return item.requiredRoles.every(requiredRole => {
      return this.isInRole(requiredRole);
    });
  }

  private findNavigationConfig(state: RouterStateSnapshot): NavItem {
    let navConfig: NavItem;

    this.configService.navItems.some(navItem => {
      /* To match a parent route the route need to match url completely
       * To match a child route the url needs to start with the child route
       *
       * This makes both of the following be treated equally
       * /item-price-list and
       * /item-price-list/item-search
       */
      navConfig = navItem.route === state.url
        ? navItem
        : navItem.children.find(childItem => state.url.startsWith(childItem.route));

      return !!navConfig;
    });

    return navConfig;
  }

  isLocalStorageSupported(): boolean {
    const mod = 'localStorageTest';
    try {
      localStorage.setItem(mod, 'test');
      localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  }
}
