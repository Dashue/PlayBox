import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  /**
   * Convert a date string w/o time or timezone information
   * @param {string} dateString in the format of YYYY-MM-DD
   * @returns {Date} date in the client's locale
   */
  public fromServerToLocal(dateString: string): Date {
    return moment(dateString).toDate();
  }

  /**
   * Convert a Date to a locale string
   * @param {Date} date standard JavaScript Date object
   * @returns {string} ISO string in the format of YYYY-MM-DD
   */
  public getLocalString(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
