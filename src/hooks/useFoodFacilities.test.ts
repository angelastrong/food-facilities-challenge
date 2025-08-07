import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useFoodFacilities from "./useFoodFacilities";
import { foodFacilityService } from "../services/foodFacilityService";
import { FacilityStatus, FacilityType } from "../types/foodFacility";

// Mock the service
vi.mock("../services/foodFacilityService", () => ({
   foodFacilityService: {
      loadData: vi.fn(),
   },
}));

const mockDataService = vi.mocked(foodFacilityService);

const mockFacilities = [
   {
      locationId: "1",
      applicantName: "Krusty Krab",
      facilityType: FacilityType.TRUCK,
      address: "123 Main St",
      status: FacilityStatus.APPROVED,
      foodItems: "burgers",
      latitude: 0,
      longitude: 0,
   },
   {
      locationId: "2",
      applicantName: "Pizza Planet",
      facilityType: FacilityType.TRUCK,
      address: "456 Story Ave",
      status: FacilityStatus.REQUESTED,
      foodItems: "pizzas",
      latitude: 0,
      longitude: 0,
   },
];

describe("useFoodFacilities", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      mockDataService.loadData.mockResolvedValue(mockFacilities);
   });

   it("loads data on mount", async () => {
      const { result } = renderHook(() => useFoodFacilities());

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
         expect(result.current.loading).toBe(false);
      });

      expect(result.current.filteredFacilities).toEqual(mockFacilities);
      expect(mockDataService.loadData).toHaveBeenCalledTimes(1);
   });

   it("filters by name correctly", async () => {
      const { result } = renderHook(() => useFoodFacilities());

      await waitFor(() => expect(result.current.loading).toBe(false));

      act(() => {
         result.current.searchFacilities("Krab", "name", null);
      });

      expect(result.current.filteredFacilities).toHaveLength(1);
      expect(result.current.filteredFacilities[0].applicantName).toBe(
         "Krusty Krab"
      );
   });

   it("filters by address correctly", async () => {
      const { result } = renderHook(() => useFoodFacilities());

      await waitFor(() => expect(result.current.loading).toBe(false));

      act(() => {
         result.current.searchFacilities("STO", "address", null);
      });

      expect(result.current.filteredFacilities[0].applicantName).toEqual(
         "Pizza Planet"
      );
   });

   it("handles search across all fields", async () => {
      const { result } = renderHook(() => useFoodFacilities());

      await waitFor(() => expect(result.current.loading).toBe(false));

      act(() => {
         result.current.searchFacilities("STO", "all", null);
      });

      expect(result.current.filteredFacilities).toHaveLength(1);
   });

   it("handles loading errors", async () => {
      mockDataService.loadData.mockRejectedValue(
         new Error("Error loading facilities")
      );

      const { result } = renderHook(() => useFoodFacilities());

      await waitFor(() => {
         expect(result.current.loading).toBe(false);
         expect(result.current.error).toBe("Error loading facilities");
      });
   });
});
