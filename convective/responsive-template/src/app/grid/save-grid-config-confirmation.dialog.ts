import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GridConfiguration} from '../models/grid-configuration';

type action = 'add' | 'update' | 'delete';

export interface SaveGridConfigDialogData {
  configurations: GridConfiguration[];
  current: GridConfiguration;
}

export interface SaveGridConfigResult {
  action: action;
  config: GridConfiguration;
}

@Component({
  selector: 'hfc-save-grid-config-confirmation',
  templateUrl: './save-grid-config-confirmation.dialog.html',
  styleUrls: ['./save-grid-config-confirmation.dialog.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaveGridConfigConfirmationDialog implements OnInit {
  public showNewConfig = false;

  public get showDelete(): boolean {
    const config = (<GridConfiguration>this.form.controls['selectedConfig'].value);
    return !this.showNewConfig && !(String(config.name).startsWith('System Default'));
  };

  public configurations: GridConfiguration[];
  public form: FormGroup;
  public newConfig: GridConfiguration;
  private currentConfig: GridConfiguration;

  constructor(private dialogRef: MatDialogRef<SaveGridConfigConfirmationDialog>,
              @Inject(MAT_DIALOG_DATA) data: SaveGridConfigDialogData,
              private fb: FormBuilder) {
    // Don't modify the actual config in the dialog. Just return a copy of the updated configuration.
    this.configurations = data.configurations.map(item => Object.assign({}, item));

    this.newConfig = {
      id: 0, name: 'New...', columns: [], isDefault: false, isUserDefault: false, pageSize: 0,
      activeSearch: [], searchVisibility: true, gridName: data.current.gridName
    };

    this.currentConfig = this.configurations.find(x => x.id === data.current.id) || this.newConfig;
  }

  public ngOnInit() {
    this.form = this.fb.group({
      selectedConfig: this.currentConfig,
      newConfigName: [null, Validators.required],
      isUserDefault: this.currentConfig.isUserDefault
    });
  }

  public selectConfig() {
    this.showNewConfig = false;
  }

  public selectNewConfig() {
    this.showNewConfig = true;
    this.form.patchValue({'isDefault': false});
  }

  public close() {
    this.validateFormAndDisplayErrors();
    if (this.showNewConfig && this.form.invalid) {
      return;
    }

    const isUserDefault = this.form.controls['isUserDefault'].value;
    const config: GridConfiguration = this.form.controls['selectedConfig'].value;
    let result: SaveGridConfigResult;
    config.isUserDefault = isUserDefault;

    if (config.id === 0) {
      config.name = this.form.controls['newConfigName'].value;
      result = {
        action: 'add',
        config: config
      };
    } else {
      result = {
        action: 'update',
        config: config
      };
    }

    this.dialogRef.close(result);
  }

  validateFormAndDisplayErrors() {
    Object.keys(this.form.controls).map((controlName) => {
      this.form.get(controlName).markAsTouched({onlySelf: true});
    });
  }

  public getConfigDisplayName(config: GridConfiguration) {
    let text = config.name;
    if (config.isUserDefault) {
      text += ' (Default)';
    }
    return text;
  }

  public deleteConfiguration() {
    const config = this.form.controls['selectedConfig'].value as GridConfiguration;
    const result: SaveGridConfigResult = {
      action: 'delete',
      config: config
    };

    this.dialogRef.close(result);
  }
}
