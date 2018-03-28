export interface CustomerItemsSold {
  data: SoldItem[];
  page: number;
  pageSize: number;
  total: number;
}
export interface SoldItem {
  description: string;
  itemId: number;
  itemNumber: string;
}
