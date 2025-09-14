import { useState } from "react";
import { motion } from "framer-motion";

function OwnersGrid() {
  const [search, setSearch] = useState("");
  const [properties] = useState([
    {
      id: 1,
      title: "Luxury Apartment in City Center",
      desc: "2 BHK | Fully Furnished | 1200 sqft",
      price: "₹35,000/month",
      img: "https://source.unsplash.com/random/400x300/?apartment",
    },
    {
      id: 2,
      title: "Modern Villa with Garden",
      desc: "4 BHK | Private Garden | 3000 sqft",
      price: "₹1.2 Cr",
      img: "https://source.unsplash.com/random/400x300/?villa",
    },
    {
      id: 3,
      title: "Commercial Office Space",
      desc: "1000 sqft | Prime Location",
      price: "₹75,000/month",
      img: "https://source.unsplash.com/random/400x300/?office",
    },
  ]);

  const filtered = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
          >
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
              <p className="text-amber-500 font-semibold mt-3">{p.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default OwnersGrid