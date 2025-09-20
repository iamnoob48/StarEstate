import { motion } from "framer-motion"
import { MapPin, Bed, Bath, Square, Heart, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

function BuyersCard({ properties }) {
  const navigate = useNavigate();

  // helper: render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
    }

    if (hasHalf) {
      stars.push(<Star key="half" className="h-4 w-4 text-yellow-500 fill-yellow-300" />);
    }

    while (stars.length < 5) {
      stars.push(<Star key={`empty-${stars.length}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {properties.map((property, idx) => (
        <motion.div
          key={property.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-50 hover:shadow-xl transition-all duration-300 group"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.15, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative md:w-80 h-64 md:h-56 overflow-hidden">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
              </button>
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
                For Sale
              </div>
            </div>

            {/* Details Section */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-amber-600" />
                    {property.city}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-600">{`₹${property.price}`}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2 text-gray-700">
                  <Bed className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Bath className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Square className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">{property.area} sqft</span>
                </div>
              </div>

              <div className="mt-4 mb-5">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  Beautiful {property.bedrooms} bedroom property with modern amenities and excellent connectivity.
                  Perfect for families looking for comfort and convenience.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                {/* Rating Section */}
                {property.rating > 0.0 && (
                  <div className="flex items-center gap-1">
                  {renderStars(property.rating || 0)}
                  <span className="text-sm text-gray-600 ml-2">{property.rating?.toFixed(1) || "0.0"}</span>
                </div>
                )}

                <div className="flex gap-3">
                  <button
                    className="py-2.5 px-4 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg"
                    onClick={() => navigate(`/buyers/property/${property.id}`)}
                  >
                    View Details
                  </button>
                  <button className="px-4 py-2.5 rounded-xl border-2 border-amber-600 text-amber-600 font-medium hover:bg-amber-50 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default BuyersCard
