import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NavService} from '../nav.service';
import {User} from '../models/user';
import {ConfigService} from '../config.service';

@Component({
  selector: 'hfc-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  public errorMessage: string;
  public loginInProgress = false;

  constructor(public authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              public navService: NavService,
              public configService: ConfigService) {
    this.loginForm = fb.group({username: '', password: ''});
  }

  ngOnInit() {
    this.navService.title = this.configService.appName;
  }

  login() {
    this.loginInProgress = true;
    this.authService.login(
      this.configService.applicationId,
      this.loginForm.get('username').value,
      this.loginForm.get('password').value)
    .subscribe((response: User) => {
      this.loginInProgress = false;
      this.authService.setLoggedInUser(response);
      this.router.navigate(['maintenance']);
    }, error => {
      this.loginInProgress = false;
      this.errorMessage = `Request Failed: ${error.statusText}`;
    });
  }
}
