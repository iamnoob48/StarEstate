import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OwnersCard from "./OwnersCard";

function OwnersGrid() {
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const token = localStorage.getItem('token');

  const filtered = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const displayCards = async ()=>{
    try {
        const response = await fetch('/property', {
            headers : {'Authorization' : token},

        })
        const data = await response.json();
        setProperties(data)
        
    } catch (err) {
        console.log(err);
        
    }
  }

  useEffect(()=>{
    if(token){
        displayCards();
    }
  }, [token])

  return (
   

    
    <div className="px-6 md:px-16 py-12">
        
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search properties by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none transition"
        />
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ?(
        <div className="flex justify-center items-center">
            <p className="text-5xl font-extrabold ">No properties of your own</p>

        </div>
      ) :(
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, idx) => (
          <OwnersCard key={p.id} p={p} idx={idx}/>
        ))}
      </div>
      )} 
      
    </div>
  );
}

export default OwnersGrid