import {Component, OnInit} from '@angular/core';
import {NavService} from '../../nav.service';

/**
 * @deprecated
 */
@Component({
  selector: 'hfc-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  constructor(private navService: NavService) {}

  ngOnInit() {
    this.navService.title = 'Create Row';
  }
}
