import {Injectable} from '@angular/core';

/**
 * @description This service can be used to store state when navigating.
 *
 * @example
 * set('my-state', currentState)
 * navigate
 * come back
 * currentState = get('my-state')
*/
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
