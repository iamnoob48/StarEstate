import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const propertyData = [
  {
    id: 1,
    title: "2BHK Apartment in Jubilee Hills",
    location: "Hyderabad",
    price: "1.23 Cr",
    image: "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2021/05/26144958/RIS_147-1.jpg",
    features: { beds: 2, baths: 2, area: "1200 sqft" },
  },
  {
    id: 2,
    title: "Luxury Villa in Gachibowli",
    location: "Hyderabad",
    price: "₹2.5 Cr",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: { beds: 4, baths: 5, area: "4500 sqft" },
  },
  {
    id: 3,
    title: "Commercial Office Space - Hitech City",
    location: "Hyderabad",
    price: "₹20 Cr",
    image: "https://plus.unsplash.com/premium_photo-1680296668489-fc33864caf2e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: { beds: "-", baths: "-", area: "3000 sqft" },
  },
];

function Properties() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {propertyData.map((property, idx) => (
          <motion.div
            key={property.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition group"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="h-full w-full object-cover group-hover:scale-110 transition duration-300"
              />
            </div>

            {/* Details */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1 text-amber-600" />
                {property.location}
              </div>
              <p className="text-amber-600 font-bold mt-2">{property.price}</p>

              {/* Features */}
              <div className="flex justify-between text-sm text-gray-700 mt-4">
                <span>{property.features.beds} Beds</span>
                <span>{property.features.baths} Baths</span>
                <span>{property.features.area}</span>
              </div>

              {/* CTA */}
              <button className="mt-5 w-full py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Properties;
