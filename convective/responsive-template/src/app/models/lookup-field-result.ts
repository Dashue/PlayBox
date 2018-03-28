export class LookupFieldResult {
  fieldDescription: string;
  fieldDisplayText: string;
  fieldId: string;
  fieldKey: string;

  constructor(item?: ServerLookupFieldResult) {
    /* Maps server side type to client side */
    this.fieldDescription = item ? item.fieldDescription : '';
    this.fieldDisplayText = item ? item.fieldDisplayText : '';
    this.fieldId = item ? item.fieldId : '';
    this.fieldKey = item ? item.fieldKey : '';
  }
}

export interface ServerLookupFieldResult {
  fieldDescription: string;
  fieldDisplayText: string;
  fieldId: string;
  fieldKey: string;
}
