import { useEffect, useState } from "react";
import "./App.css";
import SearchBar, { SearchField } from "./components/SearchBar";
import useFoodFacilities from "./hooks/useFoodFacilities";
import { FacilityStatus } from "./types/foodFacility";
import FacilityList from "./components/FacilityList";

function App() {
   const {
      filteredFacilities,
      searchFacilities,
      loading,
      error: facilitiesError,
   } = useFoodFacilities();
   const [searchTerm, onSearchTermChange] = useState("");
   const [searchField, onSearchFieldChange] = useState<SearchField>("all");
   const [statusFilter, onStatusFilterChange] = useState<FacilityStatus | null>(
      null
   );

   useEffect(() => {
      searchFacilities(searchTerm, searchField, statusFilter);
   }, [searchTerm, searchField, statusFilter]);

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="App">
         <h1>Food Facility Finder</h1>
         <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchTermChange}
            searchField={searchField}
            onFieldChange={onSearchFieldChange}
            statusFilter={statusFilter}
            onStatusChange={onStatusFilterChange}
         />
         <FacilityList
            facilities={filteredFacilities}
            loading={loading}
            error={facilitiesError}
         />
      </div>
   );
}

export default App;
