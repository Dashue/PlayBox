import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavService} from '../nav.service';

@Component({
  selector: 'hfc-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(public authService: AuthService,
              private fb: FormBuilder,
              public navService: NavService) {
    this.loginForm = fb.group({username: '', password: ''});
  }

  ngOnInit() {
    this.navService.title = this.navService.appName;
  }

  login() {
    try {
      this.authService.login();
    } catch (e) {
      this.errorMessage = `Request Failed: ${e}`;
    }
  }
}
