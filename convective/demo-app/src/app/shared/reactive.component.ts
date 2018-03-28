/* See https://github.com/angular/angular/issues/5689 for a discussion that lead to this solution */

import {OnChanges, SimpleChange} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ConnectableObservable} from 'rxjs/observable/ConnectableObservable';
import {Observer} from 'rxjs/Observer';

export interface TypedSimpleChange<T> {
  previousValue: T;
  currentValue: T;
}

export class ReactiveComponent implements OnChanges {
  private changesObserver: Observer<{ [key: string]: SimpleChange }>;
  private changes$: ConnectableObservable<{ [key: string]: SimpleChange }>;

  private callback = (observer: Observer<{ [key: string]: SimpleChange }>) => this.changesObserver = observer;

  constructor() {
    this.changes$ = Observable.create(this.callback).publishReplay(1);
    this.changes$.connect();
  }

  public observeProperty<T>(propertyName: string): Observable<TypedSimpleChange<T>> {
    return this.changes$
    .filter(changes => changes.hasOwnProperty(propertyName))
    .map(changes => changes[propertyName]);
  }

  public observePropertyCurrentValue<T>(propertyName: string): Observable<T> {
    return this.observeProperty<T>(propertyName)
    .map(change => change.currentValue);
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    this.changesObserver.next(changes);
  }
}
