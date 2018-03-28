import {Injectable} from '@angular/core';
import {GridConfiguration} from '../models/grid-configuration';

@Injectable()
export class GridComponentService {

  private temproraryConfigs: {[tableName: string]: GridConfiguration} = {};

  constructor() {}

  getAndRemoveTemporaryConfig(tableName: string) {
    const config = this.temproraryConfigs[tableName];

    if (config) {
      delete this.temproraryConfigs[tableName];
    }

    return config;
  }

  setTemporaryConfig(tableName: string, config: GridConfiguration) {
    this.temproraryConfigs[tableName] = config;
  }
}
