import { FoodFacility } from "../types/foodFacility";
import FacilityCard from "./FacilityCard";

interface FacilityListProps {
   facilities: FoodFacility[];
   loading: boolean;
   error: string | null;
}

export default function FacilityList({
   facilities,
   loading,
   error,
}: FacilityListProps) {
   if (loading) return <div>Loading...</div>;

   if (error) {
      return <div>Error loading data</div>;
   }

   if (!facilities || facilities.length === 0) {
      return <div>No facilities found</div>;
   }

   return (
      <div className="facility-list">
         <h2>Found {facilities.length} facilities</h2>
         <div className="facility-grid">
            {facilities.map((facility, index) => (
               <FacilityCard
                  key={facility.locationId || index}
                  facility={facility}
               />
            ))}
         </div>
      </div>
   );
}
