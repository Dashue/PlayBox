import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export interface Select {
  displayName: string;
  fieldName: string;
}

export interface SelectData {
  name: string;
  value: string;
}

@Injectable()
export class MaintenanceService {
  private data = {
    'Grids': [
      {
        'Name': 'accessProfileGrid',
        'Max Page Size': '100',
        'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM',
        'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      }, {
        'Name': 'accessProfileGrid',
        'Max Page Size': '100',
        'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM',
        'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      }, {
        'Name': 'accessProfileGrid',
        'Max Page Size': '100',
        'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM',
        'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      }, {
        'Name': 'accessProfileGrid',
        'Max Page Size': '100',
        'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM',
        'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      }, {
        'Name': 'accessProfileGrid',
        'Max Page Size': '100',
        'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM',
        'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      }, {
        'Name': 'accessProfileGrid',
        'Max Page Size': '100',
        'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM',
        'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      },
      {
        'Name': 'accessProfileGrid', 'Max Page Size': '100', 'Created By': 'AUTO PROCESS',
        'Created On': '06/16/2014 08:27:00AM', 'Updated By': 'TAMMY L. OLSON',
        'Updated On': '03/12/2015 01:24:57AM'
      }
    ],
    'Verify Item': [
      {
        'Key': '292704',
        'Reserved Date': '08/24/2016 10:41:19 AM'
      }, {
        'Key': '840006',
        'Reserved Date': '08/24/2016 10:41:09 AM'
      }
    ],
    'Item Group': [
      {
        'Key': 'G',
        'Description': 'Grocery',
        'Order': 100,
        'Status': 'ACTIVE',
        'Long Description': '',
        'Inactive Date': '01/01/3000 12:00:00 AM',
        'Created By': 'JUSTIN R. KROGMANN',
        'Created Date': '01/05/2012 12:10:52 PM',
        'Updated By': '',
        'Updated Date': '',
        'Effective Date': '01/05/2012 12:10:52 PM'
      }, {
        'Key': 'M',
        'Description': 'Meat / Refrigerated',
        'Order': 200,
        'Status': 'ACTIVE',
        'Long Description': '',
        'Inactive Date': '01/01/3000 12:00:00 AM',
        'Created By': 'JUSTIN R. KROGMANN',
        'Created Date': '01/05/2012 12:11:00 PM',
        'Updated By': '',
        'Updated Date': '',
        'Effective Date': '01/05/2012 12:11:00 PM'
      }, {
        'Key': 'J',
        'Description': 'Janitorial',
        'Order': 300,
        'Status': 'INACTIVE',
        'Long Description': '',
        'Inactive Date': '01/02/3000 12:00:00 AM',
        'Created By': 'JUSTIN R. KROGMANN',
        'Created Date': '01/07/2012 12:11:00 PM',
        'Updated By': '',
        'Updated Date': '',
        'Effective Date': '01/07/2012 12:11:00 PM'
      }, {
        'Key': 'S',
        'Description': 'Service',
        'Order': 400,
        'Status': 'ACTIVE',
        'Long Description': '',
        'Inactive Date': '01/03/3000 12:00:00 AM',
        'Created By': 'JUSTIN R. KROGMANN',
        'Created Date': '01/08/2012 12:11:00 PM',
        'Updated By': '',
        'Updated Date': '',
        'Effective Date': '01/08/2012 12:11:00 PM'
      }
    ]
  };
  private tables = {
    'Operations': [
      'Operations Approvers',
      'Base Code Date Type',
      'Box Date Format',
      'Code Date Phrase',
      'Code Date Type',
      'GP Date Format',
      'Location Type',
      'Locations',
      'Trim Item Notification',
      'Item Group'
    ],
    'Miscellaneous': [
      'Grid Maintenance',
      'Global Values',
      'Record Status',
      'Generic Maint',
      'Create Generic Maint',
      'Verify Item'
    ],
    'Admin': [
      'Grids'
    ]
  };

  constructor() {}

  public getTableData(tableName: string, offset: number = 0, limit: number = 0): any[] {
    return this.data[tableName] || [];
  }

  public getTables(name: string): string[] {
    return this.tables[name] || [];
  }

  public getGroups(): string[] {
    return Object.keys(this.tables);
  }

  public getSelects(tableName: string): Observable<Select[]> {
    if (tableName === 'Item Group') {
      return Observable.of([{
        displayName: 'Select 1',
        fieldName: 'field_1'
      },
      {
        displayName: 'Select 2',
        fieldName: 'field_2'
      }])
    }

    return Observable.of([]);
  }

  public getSelectData(fieldName: string, tableName: string): Observable<SelectData[]> {

    if (fieldName === 'field_1' && tableName === 'Item Group') {
      return Observable.of([{
        name: 'Value 1',
        value: '1'
      },
      {
        name: 'Value 2',
        value: '2'
      }]);
    }

    if (fieldName === 'field_2' && tableName === 'Item Group') {
      return Observable.of([{
        name: 'Value 3',
        value: '3'
      },
      {
        name: 'Value 4',
        value: '4'
      }]);
    }

    return Observable.of([]);
  }
}
