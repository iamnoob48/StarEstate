import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Building2, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function TenantsHero() {
  const [location, setLocation] = useState("");
  const [rentType, setRentType] = useState("");

  const handleClick = async () => {
    fetchData({ location, rentType });
  };

  return (
    <div className="h-[70vh] w-full bg-white relative mt-15">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1920"
        alt="modern apartments"
        className="w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
    </div>
  
    {/* Hero Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-[50vh] text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg"
      >
        Rent Smarter, Live Better
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-3 text-base md:text-lg text-gray-200 max-w-2xl"
      >
        Explore modern rental homes, apartments, and co-living spaces curated
        for comfort and convenience.
      </motion.p>
  
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-6 w-full max-w-4xl"
      >
        <Card className="rounded-2xl shadow-2xl backdrop-blur-sm bg-white/90 p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 flex-1 px-4 w-full">
            <MapPin className="h-5 w-5 text-amber-500" />
            <Input
              type="text"
              placeholder="Enter location (e.g., Hyderabad)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border-0 shadow-none focus-visible:ring-0 text-gray-800"
            />
          </div>
  
          <div className="flex items-center gap-2 flex-1 px-4 w-full md:border-l">
            <Building2 className="h-5 w-5 text-amber-500" />
            <select
              className="w-full bg-transparent focus:outline-none text-gray-700"
              value={rentType}
              onChange={(e) => setRentType(e.target.value)}
            >
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Shared">Shared / PG</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
  
          <Button
            onClick={handleClick}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition w-full md:w-auto"
          >
            <Search className="h-5 w-5" />
            Search
          </Button>
        </Card>
      </motion.div>
    </div>
  </div>
  
  );
}

export default TenantsHero;
