import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, SlidersHorizontal } from "lucide-react";
import FilterBar from "./FilterBar";
import Category from "../LandingPageComps/Category";

function BuyersHero({fetchData}) {
  const [category, setCategory] = useState("")
  
  const handleClick = async ()=>{
    fetchData(category);


  }
   
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1740"
            alt="cityscape"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold text-white drop-shadow-lg"
          >
            Find Your <span className="text-amber-400">Perfect Home</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 text-lg text-gray-200"
          >
            Browse verified listings, tailored to your needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-8 w-full max-w-4xl bg-white rounded-full shadow-xl p-3 flex items-center gap-3"
          >
            <div className="flex items-center gap-2 flex-1 px-4">
              <MapPin className="h-5 w-5 text-amber-500" />
              <input
                type="text"
                placeholder="Enter location (e.g., Hyderabad)"
                className="w-full focus:outline-none text-gray-700"
              />
            </div>

            <div className="hidden md:flex items-center gap-2 flex-1 px-4 border-l">
              <Home className="h-5 w-5 text-amber-500" />
              <select className="w-full bg-transparent focus:outline-none text-gray-700" onChange={(e)=>{setCategory(e.target.value); }}>
                <option value="">Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition" onClick={handleClick}>
              <Search className="h-5 w-5" />
              Search
            </button>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
    
      >
        <FilterBar/>
      </motion.div>

    </div>
  );
}

export default BuyersHero;
