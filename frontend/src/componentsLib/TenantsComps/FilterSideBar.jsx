import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

function FilterSideBar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [bhk, setBhk] = useState([]);

  const handleCheckboxChange = (value, state, setter) => {
    if (state.includes(value)) {
      setter(state.filter((item) => item !== value));
    } else {
      setter([...state, value]);
    }
  };

  return (
    <aside className="w-72 bg-white rounded-xl shadow-xl p-5 sticky top-20 h-fit border-1 shadow-gray-500 ">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range (₹)</h3>
        <Slider
          defaultValue={priceRange}
          min={1000}
          max={100000}
          step={1000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Property Type</h3>
        {["Apartment", "Villa", "Studio", "Shared"].map((type) => (
          <label key={type} className="flex items-center gap-2 mb-2">
            <Checkbox
              checked={propertyTypes.includes(type)}
              onCheckedChange={() =>
                handleCheckboxChange(type, propertyTypes, setPropertyTypes)
              }
            />
            <span className="text-sm">{type}</span>
          </label>
        ))}
      </div>

      {/* BHK */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">BHK</h3>
        {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((type) => (
          <label key={type} className="flex items-center gap-2 mb-2">
            <Checkbox
              checked={bhk.includes(type)}
              onCheckedChange={() =>
                handleCheckboxChange(type, bhk, setBhk)
              }
            />
            <span className="text-sm">{type}</span>
          </label>
        ))}
      </div>

      <button
        onClick={() => onFilterChange({ priceRange, propertyTypes, bhk })}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-medium transition"
      >
        Apply Filters
      </button>
    </aside>
  );
}

export default FilterSideBar