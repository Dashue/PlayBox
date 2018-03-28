import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MdDialog} from '@angular/material';
import {WjFlexGrid} from 'wijmo/wijmo.angular2.grid';
import {
  SaveGridConfigConfirmationDialog, SaveGridConfigDialogData, SaveGridConfigResult
} from './save-grid-config-confirmation.dialog';
import {GridConfigurationService} from './grid-configuration.service';
import {GridInstanceService} from './grid-instance.service';
import {GridConfiguration} from '../models/grid-configuration';
import {AuthService} from '../auth.service';

@Component({
  selector: 'hfc-grid-configuration',
  templateUrl: './grid-configuration.component.html',
  styleUrls: ['./grid-configuration.component.scss']
})
export class GridConfigurationComponent {
  @Input('instanceService') instanceService: GridInstanceService;

  public gridOptionsForm: FormGroup;
  public configurations: GridConfiguration[];

  constructor(private fb: FormBuilder,
              private dialog: MdDialog,
              private gridConfigurationService: GridConfigurationService,
              private changeDetectorRef: ChangeDetectorRef,
              private authService: AuthService) {
    this.gridOptionsForm = this.fb.group({'selectedGridConfigName': ''});
  }

  public saveGridConfiguration(): void {
    const configurations = this.configurations.filter(config => {
      if (config.isDefault) {
        /* Prevents users without authorization to change the System Default config
         * By removing it from the data passed to SaveGridConfigConfirmationDialog
         */
        return this.authService.canChangeDefaultConfiguration();
      }

      return true;
    });

    const dialogData: SaveGridConfigDialogData = {
      configurations: configurations, current: this.instanceService.currentConfig
    };

    this.dialog.open(SaveGridConfigConfirmationDialog,
      {data: dialogData, panelClass: 'saveConfigurationDialog'})
      .afterClosed()
      .subscribe((result: SaveGridConfigResult) => {
        if (result) {

          if (result.action === 'add' || result.action === 'update') {
            this.instanceService.populateLatestValues(result.config);

            this.gridConfigurationService.saveConfiguration(result.config)
              .subscribe((response: GridConfiguration) => {
                if (result.action === 'add') {
                  this.configurations.push(response);
                } else {
                  const index = this.configurations.findIndex(x => x.id === response.id);
                  this.configurations[index] = response;
                }

                if (response.isDefault) {
                  // Make sure there's only one default config
                  this.configurations.forEach((config: GridConfiguration) => {
                    if (config.id !== response.id) {
                      config.isUserDefault = false;
                    }
                  });
                  this.changeDetectorRef.detectChanges();
                }

                this.selectConfiguration(response);
              });
          }

          if (result.action === 'delete') {
            this.gridConfigurationService.deleteConfiguration(result.config)
              .subscribe(() => {
                this.configurations = this.configurations.filter(x => x.id !== result.config.id);
                if (this.configurations.length > 0) {
                  this.selectConfiguration(this.configurations[0]);
                }
              });
          }
        }
      });
  }

  public setGrid(gridName: string, grid: WjFlexGrid) {
    this.instanceService.currentGrid = grid;

    this.gridConfigurationService.getConfigurations(gridName)
      .subscribe(item => {
        this.configurations = item;
        let defaultConfig = this.configurations.find((config: GridConfiguration) => config.isUserDefault);

        if (!defaultConfig) {
          defaultConfig = this.configurations.find(config => config.isDefault);

          if (!defaultConfig) {
            defaultConfig = this.configurations[0];
          }
        }

        if (defaultConfig) {
          this.selectConfiguration(defaultConfig);
        } else {
          this.instanceService.configurationChanged.error(
            'Unable to determine default configuration. Please contact an IT Administrator.');
        }
      }, (error) => {
        console.error(error);
        this.instanceService.configurationChanged.error(
          'Server failure when trying to determine default configuration. ' +
          'Please contact an IT Administrator.');
      });
  }

  public selectConfiguration(config: GridConfiguration) {
    if (config) {
      this.instanceService.currentConfig = config;
      this.instanceService.configurationChanged.next(config);
      this.gridOptionsForm.setValue({'selectedGridConfigName': config.name});
    }
  }
}
