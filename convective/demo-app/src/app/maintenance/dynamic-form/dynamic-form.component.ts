import {Component, OnInit} from '@angular/core';
import {NavService} from '../../nav.service';

// TODO make this component more reusable to match its name
@Component({
  selector: 'hfc-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  constructor(private navService: NavService) {}

  ngOnInit() {
    // TODO support both Edit and Create modes
    this.navService.title = 'Create Row';
  }
}
