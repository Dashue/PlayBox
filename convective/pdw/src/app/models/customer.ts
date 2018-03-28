export interface CustomerListResponse {
  data: Customer[];
  page: number;
  pageSize: number;
  total: number;
}
export interface Customer {
  mrCustomerId: number;
  customerNumber: string;
  name: string;
  city: string;
  state: string;
  zipcode: number;
  territoryNumber: string;
  territoryName: string;
  districtNumber: string;
  districtName: string;
  regionNumber: string;
  regionName: string;
  divisionNumber: string;
  divisionName: string;
  priceList: number;
  bracketId: number;
}
