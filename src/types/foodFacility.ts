export enum FacilityStatus {
   APPROVED = "APPROVED",
   REQUESTED = "REQUESTED",
   SUSPEND = "SUSPEND",
   EXPIRED = "EXPIRED",
   ISSUED = "ISSUED",
}

export enum FacilityType {
   TRUCK = "Truck",
   PUSH_CART = "Push Cart",
}

export interface FoodFacility {
   locationId: string;
   applicantName: string;
   facilityType?: FacilityType;
   address: string;
   status: FacilityStatus;
   foodItems: string;
   latitude: number;
   longitude: number;
}
