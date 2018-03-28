import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  /**
   * Convert a date string w/o time or timezone information
   * @param {string} dateString in the format of 06/12/2012 10:59:12 AM
   * @returns {Date} date in the client's locale
   */
  public fromServerToLocal(dateString: string): Date {
    return moment(dateString, 'MM/DD/YYYY hh:mm:ss A').toDate();
  }

  /**
   * Convert a Date to a locale string
   * @param {Date} date standard JavaScript Date object
   * @returns {string} in the format of mm/dd/yyyy
   */
  public getLocalString(date: Date): string {
    if (date) {
      return moment(date).format('MM/DD/YYYY');
    }
  }
}
