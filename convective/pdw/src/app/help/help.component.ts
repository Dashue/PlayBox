import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NavService} from '../nav.service';

@Component({
  selector: 'hfc-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(public authService: AuthService,
              private navService: NavService) {
    navService.title = 'Help';
  }

  ngOnInit() {}
}
