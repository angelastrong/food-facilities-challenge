import { FacilityStatus } from "../types/foodFacility";

export type SearchField = "all" | "name" | "address";

interface SearchBarProps {
   searchTerm: string;
   onSearchChange: (term: string) => void;
   searchField: SearchField;
   onFieldChange: (field: SearchField) => void;
   statusFilter: FacilityStatus | null;
   onStatusChange: (status: FacilityStatus | null) => void;
}

export default function SearchBar({
   searchTerm,
   onSearchChange,
   searchField,
   onFieldChange,
   statusFilter,
   onStatusChange,
}: SearchBarProps) {
   const hasActiveFilters = searchTerm || statusFilter;
   return (
      <div className="search-bar">
         <div className="search-input-group">
            <select
               className="search-field-selector"
               value={searchField}
               onChange={(e) => onFieldChange(e.target.value as SearchField)}
            >
               <option value="all">All Fields</option>
               <option value="name">Name</option>
               <option value="address">Address</option>
            </select>
            <input
               className="search-input"
               type="text"
               placeholder="Search facilities..."
               value={searchTerm}
               onChange={(e) => onSearchChange(e.target.value)}
            />
         </div>

         <div className="status-filter">
            <select
               value={statusFilter || ""}
               onChange={(e) => {
                  const value = e.target.value;
                  onStatusChange(
                     value === "" ? null : (value as FacilityStatus)
                  );
               }}
            >
               <option value="">All Statuses</option>
               {Object.values(FacilityStatus).map((status) => (
                  <option key={status} value={status}>
                     {status}
                  </option>
               ))}
            </select>
         </div>
         {hasActiveFilters && (
            <button
               className="clear-button"
               onClick={() => {
                  onSearchChange("");
                  onStatusChange(null);
                  onFieldChange("all");
               }}
            >
               Clear all filters
            </button>
         )}
      </div>
   );
}
