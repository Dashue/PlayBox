import {ServerLookupFieldResult} from './lookup-field-result';

export interface LookupFieldResponse {
  data: ServerLookupFieldResult[];
  total: number;
}
