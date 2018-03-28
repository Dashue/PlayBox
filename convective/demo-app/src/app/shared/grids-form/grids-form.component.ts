import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchPanelContent} from 'hfc-components/dist';

@Component({
  selector: 'hfc-grids-form',
  templateUrl: './grids-form.component.html',
  styleUrls: ['./grids-form.component.scss']
})
export class GridsFormComponent implements SearchPanelContent {
  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  public title = 'Grid Search';
  public form: FormGroup;

  private initialFormState = {
    name: ''
  };

  constructor(private fb: FormBuilder) {
    this.form = fb.group(this.initialFormState);
  }

  public clear() {
    this.form.setValue(this.initialFormState);
  }

  public submit() {
    this.formData.emit(this.form.getRawValue());
  }
}
