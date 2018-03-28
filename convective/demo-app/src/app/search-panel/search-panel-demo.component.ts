import {Component, OnInit} from '@angular/core';
import {NavService} from '../nav.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'hfc-search-form-demo',
  templateUrl: './search-panel-demo.component.html',
  styleUrls: ['./search-panel-demo.component.scss']
})
export class SearchPanelDemoComponent implements OnInit {
  submittedValues: any;
  selectedFormName: string;
  public formSelectorForm: FormGroup;
  forms: string[];

  constructor(private navService: NavService,
              private fb: FormBuilder) {
    this.navService.title = 'Search Panel Demo';
    this.forms = ['Grids', 'Item Group', 'Verify Item'];
    this.selectedFormName = this.forms[1];
    this.formSelectorForm = fb.group({'selectedFormName': this.selectedFormName});
  }

  ngOnInit() {}

  onFormData(data: any) {
    this.submittedValues = data;
  }

  public changeForm(formName: string) {
    this.formSelectorForm.get('selectedFormName').setValue(formName);
    this.selectedFormName = formName;
  }
}
