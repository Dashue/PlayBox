import {Injectable} from '@angular/core';
import {ConfigService} from '../config.service';
import {GridGroup} from '../models/grid-group';
import {GridInfo} from '../models/grid-info';

@Injectable()
export class MaintenanceService {

  private maintenanceGrids: GridGroup[];

  constructor(private configService: ConfigService) {
    this.maintenanceGrids = configService.maintenanceGrids;
  }

  public getGrids(groupName: string): GridInfo[] {
    for (let i = 0; i < this.maintenanceGrids.length; i++) {
      if (this.maintenanceGrids[i].groupName === groupName) {
        return this.maintenanceGrids[i].grids;
      }
    }
    return [];
  }

  public getGroups(): string[] {
    const groups: string[] = [];
    this.maintenanceGrids.map((group: GridGroup) => groups.push(group.groupName));
    return groups;
  }
}
