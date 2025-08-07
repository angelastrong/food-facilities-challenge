import { useEffect, useState } from "react";
import { foodFacilityService } from "../services/foodFacilityService";
import { FacilityStatus, FoodFacility } from "../types/foodFacility";
import { SearchField } from "../components/SearchBar";

export default function useFoodFacilities() {
   const [allFacilities, setAllFacilities] = useState<FoodFacility[]>([]);
   const [filteredFacilities, setFilteredFacilities] = useState<FoodFacility[]>(
      []
   );
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const loadData = async () => {
         try {
            const facilities = await foodFacilityService.loadData();
            setAllFacilities(facilities);
            setFilteredFacilities(facilities);
            setLoading(false);
         } catch (error) {
            console.error("Failed to load facilities", error);
            setError(
               error instanceof Error
                  ? error.message
                  : "Failed to load facilities"
            );
            setLoading(false);
         }
      };

      loadData();
   }, []);

   const searchFacilities = (
      searchTerm: string,
      searchField: SearchField,
      status: FacilityStatus | null
   ) => {
      const filtered = allFacilities.filter((facility) => {
         const matchesStatus = !status || facility.status === status;

         let matchesSearch = true;
         if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const checkField = (value: string | undefined) =>
               value?.toLowerCase().includes(term) ?? false;
            switch (searchField) {
               case "name":
                  matchesSearch = checkField(facility.applicantName);
                  break;
               case "address":
                  matchesSearch = checkField(facility.address);
                  break;
               case "all":
               default:
                  matchesSearch =
                     checkField(facility.applicantName) ||
                     checkField(facility.address);
                  break;
            }
         }

         return matchesStatus && matchesSearch;
      });

      setFilteredFacilities(filtered);
   };

   return { filteredFacilities, searchFacilities, loading, error };
}
