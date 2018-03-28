import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MaintenanceService} from './maintenance.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavService} from '../nav.service';
import {GridInfo} from '../models/grid-info';
import {AuthService} from '../auth.service';

@Component({
  selector: 'hfc-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  public groups: string[];
  public maintenanceSelectorForm: FormGroup;
  public selectedGrid: GridInfo;
  @ViewChild('content') grid: any;

  constructor(public maintenanceService: MaintenanceService,
              private fb: FormBuilder,
              private navService: NavService,
              private cdRef: ChangeDetectorRef,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.navService.title = 'Grid Maintenance';
    this.navService.isBackEnabled = false;
    this.groups = this.maintenanceService.getGroups();
    this.selectedGrid = this.getFirstVisibleGrid(this.groups);
    this.maintenanceSelectorForm = this.fb.group({'selectedGrid': this.selectedGrid});
    // Don't display groups if there are no visible grids to display due to RBAC
    if (this.selectedGrid === null) {
      this.groups = [];
    } else {
      this.changeTable(this.selectedGrid);
    }
  }

  public changeTable(grid: GridInfo) {
    this.maintenanceSelectorForm.get('selectedGrid').setValue(grid);
    this.selectedGrid = grid;
    this.cdRef.detectChanges();
  }

  private getFirstVisibleGrid(groups: string[]): GridInfo | null {
    for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
      const grids = this.maintenanceService.getGrids(groups[groupIndex]);
      for (let gridIndex = 0; gridIndex < grids.length; gridIndex++) {
        if (this.authService.isInRole(grids[gridIndex].readRole)) {
          return grids[gridIndex];
        }
      }
    }
    return null;
  }
}
