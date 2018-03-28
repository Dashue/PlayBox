import {Component, ChangeDetectorRef, OnInit, ViewChild} from '@angular/core';
import {MaintenanceService, Select} from './maintenance.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavService} from '../nav.service';
import {Sorting} from '../grid/grid.component';

@Component({
  selector: 'hfc-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  @ViewChild('content') grid: any;
  public data: any[];
  public groups: string[];
  public maintenanceSelectorForm: FormGroup;
  public selectedTableName: string;
  public get currentGridTitle(): string {return this.grid ? this.grid.title : ''};
  public selects: Select[];

  constructor(public maintenanceService: MaintenanceService,
    private fb: FormBuilder,
    private navService: NavService,
    private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.navService.title = 'Table Maintenance';
    this.maintenanceSelectorForm = this.fb.group({'selectedTableName': ''});
    this.groups = this.maintenanceService.getGroups();
    this.changeTable('Item Group');
  }

  public changeTable(tableName: string) {
    this.maintenanceSelectorForm.get('selectedTableName').setValue(tableName);
    this.data = this.maintenanceService.getTableData(tableName);
    this.selectedTableName = tableName;
    this.maintenanceService.getSelects(this.selectedTableName).subscribe((selects: Select[]) => {
      this.selects = selects;
    });
    this.cdRef.detectChanges();
  }

  public onRowDeleted(row): void {
    this.data = this.data.filter(obj => obj !== row);
  }

  public onSortChanged(event: Sorting[]) {
    event.forEach(item => {
      console.log(`${item.name} ${item.ascending ? 'asc' : 'desc'}`)
      // Todo: Implement backend sorting
    })
  }

  public onFormData(data: Object) {
    console.log(`Search executed: ${JSON.stringify(data)}`);
  }
}
