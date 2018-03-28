export interface ConfirmationItem {
  confirmationNumber: number;
  customerNumber: number;
  outletNumber: number;
  bracketAddon: boolean;
  startDate: Date;
  endDate: Date;
  comments: string[];
  maxQuantity: number;
  minQuantity: number;
  orderedQty: number;
  price: number;
  allowance: string;
  regionApprovStat: ApprovalStatus;
  prdmgrApprovStat: ApprovalStatus;
  prcadmApprovStat: ApprovalStatus;
}
export enum ApprovalStatus {
  APV = 'APV ',
  REG = 'REG ',
  DNY = 'DNY ',
  PM = 'PM ',
  None = ''
}
