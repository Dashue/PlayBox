import {ColumnConfiguration} from './column-configuration';
import {SearchConfiguration} from './search-configuration';

export class GridConfiguration {
  id: number;
  name: string;
  columns: ColumnConfiguration[];
  isDefault: boolean;
  isUserDefault: boolean;
  pageSize: number;
  gridName: string;
  activeSearch: SearchConfiguration[];
  searchVisibility: boolean;
  temporaryConfiguration?: boolean;

  public static equals(x, y) {
    if (x === y) {
      // if both x and y are null or undefined and exactly the same
      return true;
    }

    if (!(x instanceof Object) || !(y instanceof Object)) {
      // if they are not strictly equal, they both need to be Objects
      console.log(`Not strictly equal: ${console.dir(x)} - ${console.dir(y)}`);
      return false;
    }
    if (x.constructor !== y.constructor) {
      // they must have the exact same prototype chain, the closest we can do is
      // test there constructor.
      console.log(`Not same prototype chain: ${console.dir(x.constructor)} - ${console.dir(y.constructor)}`);
      return false;
    }

    let p;
    for (p in x) {
      if (!x.hasOwnProperty(p)) {
        // other properties were tested using x.constructor === y.constructor
        continue;
      }

      if (!y.hasOwnProperty(p)) {
        // allows to compare x[ p ] and y[ p ] when set to undefined
        console.log(`Y does not have own property from X: ${p}`);
        return false;
      }

      if (x[p] === y[p]) {
        // if they have the same strict value or identity then they are equal
        continue;
      }

      if (typeof (x[p]) !== 'object') {
        // Numbers, Strings, Functions, Booleans must be strictly equal
        console.log(`Must be strictly equal if not object: ${p}`);
        return false;
      }

      if (!this.equals(x[p], y[p])) {
        console.log(`Does not equal in associative array: ${p}`);
        return false;
      }
    }

    for (p in y) {
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        console.log(`X does not have own own property from Y: ${p}`);
        return false;

      }
    }
    return true;
  }
}
