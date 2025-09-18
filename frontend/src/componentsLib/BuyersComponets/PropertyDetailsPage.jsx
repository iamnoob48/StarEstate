

import { useState } from "react"
import { MapPin, Bed, Bath, Square, Heart, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Map from "./Map"


export default function PropertyDetailsPage({property}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBooked, setIsBooked] = useState(property.isBooked)

  const handleBookVisit = () => {
    setIsBooked(true)
  }

  const handleCancelBooking = () => {
    setIsBooked(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Hero Image Section */}
        <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <img src={property.image || "/placeholder.svg"} alt={property.title} className="w-full h-full object-cover" />

          {/* Status Badge */}
          <Badge className="absolute top-6 left-6 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 text-sm font-semibold shadow-lg">
            {property.status}
          </Badge>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 bg-white/90 hover:bg-white shadow-lg rounded-full w-12 h-12"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Property Information - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">{property.title}</h1>
              <p className="text-3xl md:text-4xl font-bold text-amber-600">{property.price}</p>
            </div>

            {/* Property Details */}
            <div className="flex flex-wrap gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-amber-600" />
                <span className="font-medium">
                  {property.bathrooms} Bathroom{property.bathrooms !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-amber-600" />
                <span className="font-medium">
                  {property.bedrooms} Bedroom{property.bedrooms !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Square className="w-5 h-5 text-amber-600" />
                <span className="font-medium">{property.area}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg ">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">{property.address}</span>
            </div>

            {/* Booking Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100">
              {!isBooked ? (
                <Button
                  onClick={handleBookVisit}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Visit
                </Button>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700 font-medium">Your visit already Booked for date {property.bookedDate}</p>
                  <Button
                    onClick={handleCancelBooking}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-semibold py-3 px-6 rounded-lg transition-all duration-200 bg-transparent"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel Booking
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Map Section - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-96 lg:h-full min-h-[400px]">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
                {/* Map Placeholder */}
                <div className="absolute inset-4 bg-white rounded-lg shadow-inner flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="w-12 h-12 text-amber-600 mx-auto" />
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-sm text-gray-500">Property Location</p>
                  </div>
                </div>

                {/* Map Controls */}
                <Map />

                {/* Leaflet Attribution */}
                <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                  🍃 Leaflet
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}
