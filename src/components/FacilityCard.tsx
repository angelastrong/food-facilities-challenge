import { FoodFacility } from "../types/foodFacility";

interface FacilityCardProps {
   facility: FoodFacility;
}

export default function FacilityCard({ facility }: FacilityCardProps) {
   return (
      <div className="facility-card">
         <h3>{facility.applicantName}</h3>
         <p>{facility.address}</p>
         <p>Status: {facility.status}</p>
      </div>
   );
}
