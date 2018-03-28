import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchPanelContent} from 'hfc-components/dist';

@Component({
  selector: 'hfc-item-group-form',
  templateUrl: './item-group-form.component.html',
  styleUrls: ['./item-group-form.component.scss']
})
export class ItemGroupFormComponent implements SearchPanelContent {
  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  public title = 'Item Group Search';
  public form: FormGroup;

  private initialFormState = {
    key: '',
    description: '',
    status: ''
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
