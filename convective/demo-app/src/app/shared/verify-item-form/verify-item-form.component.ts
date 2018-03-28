import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchPanelContent} from 'hfc-components/dist';

@Component({
  selector: 'hfc-verify-item-form',
  templateUrl: './verify-item-form.component.html',
  styleUrls: ['./verify-item-form.component.scss']
})
export class VerifyItemFormComponent implements SearchPanelContent {
  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  public title = 'Verify Item Search';
  public form: FormGroup;

  private initialFormState = {
    key: ''
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
