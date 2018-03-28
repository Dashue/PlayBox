import {Injectable} from '@angular/core';

@Injectable()
export class StateService {

  private state = {};

  constructor() {}

  public get<T>(key): T {
    if (Object.keys(this.state).includes(key)) {
      return this.state[key];
    }

    return;
  }

  public set(key, data) {
    this.state[key] = data;
  }
}
