export interface Brand {
  saBrandId: string;
  brandId: string;
  description: string;
  createdDate: string;
  requestedBy: string;
  lastUsedDate: string;
}
export interface BrandsResponse {
  data: Brand[];
  page: number;
  pageSize: number;
  total: number;
}
