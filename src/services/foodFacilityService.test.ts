import { describe, it, expect, vi, beforeEach } from "vitest";
import { foodFacilityService } from "./foodFacilityService";
import { FacilityStatus, FacilityType } from "../types/foodFacility";

global.fetch = vi.fn();
const mockFetch = vi.mocked(fetch);

describe("foodFacilityService", () => {
   beforeEach(() => {
      vi.clearAllMocks();
   });

   it("loads and parses CSV data correctly", async () => {
      const mockCsvData = `locationid,Applicant,FacilityType,Address,Status,FoodItems,Latitude,Longitude
1,Krusty Krab,Truck,123 Main St,APPROVED,burgers,37.7749,-122.4194
2,Pizza Planet,Truck,456 Story Ave,REQUESTED,pizzas,37.7849,-122.4094`;

      mockFetch.mockResolvedValue({
         ok: true,
         text: () => Promise.resolve(mockCsvData),
      } as Response);

      const result = await foodFacilityService.loadData();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
         locationId: "1",
         applicantName: "Krusty Krab",
         facilityType: FacilityType.TRUCK,
         address: "123 Main St",
         status: FacilityStatus.APPROVED,
         foodItems: "burgers",
         latitude: 37.7749,
         longitude: -122.4194,
      });
   });

   it("handles fetch errors", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      await expect(foodFacilityService.loadData()).rejects.toThrow(
         "Network error"
      );
   });

   it("handles non-ok responses", async () => {
      mockFetch.mockResolvedValue({
         ok: false,
         statusText: "Not Found",
      } as Response);

      await expect(foodFacilityService.loadData()).rejects.toThrow(
         "Failed to fetch data: Not Found"
      );
   });

   it("handles missing or invalid data gracefully", async () => {
      const mockCsvData = `locationid,Applicant,FacilityType,Address,Status,FoodItems,Latitude,Longitude
1,,,123 Main St,INVALID_STATUS,,37.7749,-122.4194`;

      mockFetch.mockResolvedValue({
         ok: true,
         text: () => Promise.resolve(mockCsvData),
      } as Response);

      const result = await foodFacilityService.loadData();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
         locationId: "1",
         applicantName: "",
         address: "123 Main St",
         status: null,
         foodItems: "",
         latitude: 37.7749,
         longitude: -122.4194,
      });
   });
});
