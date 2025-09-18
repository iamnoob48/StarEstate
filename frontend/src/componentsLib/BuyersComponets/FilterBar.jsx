import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

function FilterBar() {
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <div className="sticky top-16 z-30 bg-white shadow-md border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6 justify-between">
        <div className="flex items-center gap-6 text-gray-700 text-sm">
          <div className="relative">
            <button
              onClick={() => toggleFilter("price")}
              className="flex items-center gap-1 hover:text-amber-600"
            >
              Price Range <ChevronDown className="h-4 w-4" />
            </button>
            {openFilter === "price" && (
              <div className="absolute mt-2 w-56 bg-white border rounded-lg shadow-lg p-4 z-40">
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  className="w-full"
                />
                <p className="mt-2 text-sm text-gray-600">₹5,000 – ₹5,00,000</p>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleFilter("type")}
              className="flex items-center gap-1 hover:text-amber-600"
            >
              Property Type <ChevronDown className="h-4 w-4" />
            </button>
            {openFilter === "type" && (
              <div className="absolute mt-2 w-44 bg-white border rounded-lg shadow-lg p-2 z-40">
                <ul className="space-y-2 text-sm text-gray-700">
                  <button className="hover:text-amber-600 cursor-pointer" >Apartment</button>
                  <li className="hover:text-amber-600 cursor-pointer">Villa</li>
                  <li className="hover:text-amber-600 cursor-pointer">Plot</li>
                  <li className="hover:text-amber-600 cursor-pointer">Commercial</li>
                </ul>
              </div>
            )}
          </div>

  
          <div className="relative">
            <button
              onClick={() => toggleFilter("sort")}
              className="flex items-center gap-1 hover:text-amber-600"
            >
              Sort By <ChevronDown className="h-4 w-4" />
            </button>
            {openFilter === "sort" && (
              <div className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg p-2 z-40">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="hover:text-amber-600 cursor-pointer">Newest</li>
                  <li className="hover:text-amber-600 cursor-pointer">Price: Low → High</li>
                  <li className="hover:text-amber-600 cursor-pointer">Price: High → Low</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <button className="flex items-center gap-2 text-gray-700 hover:text-amber-600 text-sm">
          <SlidersHorizontal className="h-4 w-4" />
          More Filters
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
