export interface CustomerItemPricing {
  customerData: CustomerData;
  priceListData: PriceListData;
  itemData: ItemData;
  pricing: PriceSet[];
}
export interface CustomerData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  shipLocID: number;
  shipLocKey: string;
  shipLocDesc: string;
  priceBracket: string;
}
export interface PriceListData {
  priceList: string;
  outlet: string;
  fullPalletQty: number;
  palletLayerQty: number;
}
export interface ItemData {
  truckloadPrice: string;
  leakerAllowance: boolean;
  pricingUnit: string;
  netWeight: string;
}
export interface PriceSet {
  name: string;
  status: ConfirmationApprovalStatus;
  confirmationId: number;
  priceList: PriceRecord[];
}
export interface PriceRecord {
  name: string;
  value: string;
}
export enum ConfirmationApprovalStatus {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  PENDING = 'PENDING'
}
