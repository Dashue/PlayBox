import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './models/user';

@Injectable()
export class AuthService {
  private currentUser: User;
  private _isLoggedIn: boolean = false;
  public get isLoggedIn(): boolean {return this._isLoggedIn};
  public get firstName(): string {return this.currentUser ? this.currentUser.firstName : ''};
  public get apiKey(): string {return this.currentUser ? this.currentUser.apikey : ''};

  constructor(private router: Router) {}

  public login() {
    // For demonstrating login failures
    // throw new Error('Unknown Error');
    this.setLoggedInUser({
      apikey: '12SDG1S5D4SGS1G2SD54SDFGS7',
      created: '',
      email: 'jonathan.doe@hormel.com',
      firstName: 'Jonathan',
      groups: ['it'],
      lastaccess: '',
      lastName: 'Doe',
      roles: ['user'],
      userID: 1,
      userStatus: '',
      userName: 'JDOE'
    });
    this.router.navigate(['maintenance']);
  }

  public logout() {
    this.currentUser = undefined;
    this._isLoggedIn = false;
    this.router.navigate(['']);
  }

  public isInGroup(group: string): boolean {
    if (this.isLoggedIn) {
      return this.currentUser && this.currentUser.groups.indexOf(group) > -1;
    }

    return false;
  }

  public isInRole(role: string): boolean {
    return this.currentUser && this.currentUser.roles.indexOf(role) > -1;
  }

  public setLoggedInUser(user: User) {
    this.currentUser = user;
    this._isLoggedIn = true;
  }
}
