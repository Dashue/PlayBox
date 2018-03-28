export interface CustomerItemPricingSearchFormData {
  effectiveDate: Date;
  customerId: string;
  customerDescription: string;
  itemId?: string;
  itemKey?: string;
  itemDescription?: string;
  shipLocationId?: string;
  shipLocationDescription?: string;
  priceBracketId?: string;
}
