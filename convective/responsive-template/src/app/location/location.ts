export class Location {
  locationId: number;
  locationKey: string;
  locationDesc: string;

  locationOrder?: string;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  effectiveDate?: string;
  inactiveDate?: string;
  status?: string;
}

export class CreateOrUpdateLocation {
  locationKey: string;
  locationDesc: string;
}
