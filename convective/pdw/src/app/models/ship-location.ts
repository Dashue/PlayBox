export interface ShipLocation {
  ghPlantsId: number;
  plantNumber: string;
  plantName: string;
}

export interface ShipLocationResponse {
  data: ShipLocation[];
  page: number;
  pageSize: number;
  total: number;
}
