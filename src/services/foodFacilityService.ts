import Papa from "papaparse";
import {
   FacilityStatus,
   FacilityType,
   FoodFacility,
} from "../types/foodFacility";

class FoodFacilityService {
   private data: FoodFacility[] = [];

   async loadData(): Promise<FoodFacility[]> {
      try {
         const csvContent = await this.getCsvContent();
         const rawData = this.parseCsv(csvContent);
         this.data = this.transformData(rawData);
         return this.data;
      } catch (error) {
         console.error("Error loading data", error);
         throw error; // Re-throw the error so tests can catch it
      }
   }

   private async getCsvContent(): Promise<string> {
      const response = await fetch("/Mobile_Food_Facility_Permit.csv");

      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      return await response.text();
   }

   private parseCsv(csvContent: string): any[] {
      const result = Papa.parse(csvContent, {
         header: true,
         skipEmptyLines: true,
         dynamicTyping: true,
      });
      return result.data;
   }

   private transformData(data: any[]): FoodFacility[] {
      return data.map((row) => ({
         locationId: row.locationid?.toString() || "",
         applicantName: row.Applicant?.toString() || "",
         ...(row.FacilityType && {
            facilityType: this.parseFacilityType(row.FacilityType.toString()),
         }),
         address: row.Address?.toString() || "",
         status: this.parseStatus(row.Status?.toString()),
         foodItems: row.FoodItems?.toString() || "",
         latitude: row.Latitude || 0,
         longitude: row.Longitude || 0,
      }));
   }

   private parseFacilityType(value: string): FacilityType | null {
      if (Object.values(FacilityType).includes(value as FacilityType)) {
         return value as FacilityType;
      }
      return null;
   }

   private parseStatus(value: string): FacilityStatus | null {
      if (Object.values(FacilityStatus).includes(value as FacilityStatus)) {
         return value as FacilityStatus;
      }
      return null;
   }
}

export const foodFacilityService = new FoodFacilityService();
