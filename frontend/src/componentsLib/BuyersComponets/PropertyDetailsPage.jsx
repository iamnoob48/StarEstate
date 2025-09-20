

import { useEffect, useState } from "react"
import { MapPin, Bed, Bath, Square, Heart, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Map from "./Map"
import { useParams } from "react-router-dom"
import { BookVisitDialog } from "./BookVisitDialog"
import { format } from "date-fns";
import RatingModal from "./RatingModal"



export default function PropertyDetailsPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState({})
  const [isBooked, setIsBooked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [date,setDate] = useState("");
  const [count, setCount] = useState(0);
  
  const {id} = useParams();
  const token = localStorage.getItem('token');

  const fetchProperty = async () => {
    try {
      const res = await fetch(`/buyersData/${id}`, {
        headers: { 'Authorization': token },
      });
      const data = await res.json();
      setProperty(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    fetchProperty();

  },[id,token])

  const handleRating = ()=>{
    setIsOpen(true);
  }

  const handleDateSelection = (date) => {
    setDate(date);

    setIsBooked(true)
  }

  const handleCancelBooking = () => {
    setIsBooked(false)
  }
  const handleSubmit = async (rating)=>{
    await fetch(`/buyersData/${id}`,{
      method : "PUT",
      headers : {'Authorization': token, 'Content-Type': 'application/json'},
      body: JSON.stringify({rating : rating})

    })

    console.log("Rating is : ",rating)

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Image */}
      <div className="relative w-full h-[500px]">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-full object-cover"
        />
  
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
  
        {/* Floating Content */}
        <div className="absolute bottom-10 left-10 text-white space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold">{property.title}</h1>
          <p className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            {property.address}, {property.city}
          </p>
          <p className="text-3xl font-bold text-amber-400">{`₹${property.price}`}</p>
        </div>
  
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 bg-white/90 hover:bg-white shadow-lg rounded-full w-12 h-12"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
      </div>
  
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-10 mt-10">
        {/* Left: Property Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow p-4 flex flex-col items-center">
              <Bed className="w-6 h-6 text-amber-600 mb-2" />
              <p className="text-gray-800 font-semibold">{property.bedrooms}</p>
              <span className="text-sm text-gray-500">Bedrooms</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow p-4 flex flex-col items-center">
              <Bath className="w-6 h-6 text-amber-600 mb-2" />
              <p className="text-gray-800 font-semibold">{property.bathrooms}</p>
              <span className="text-sm text-gray-500">Bathrooms</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow p-4 flex flex-col items-center">
              <Square className="w-6 h-6 text-amber-600 mb-2" />
              <p className="text-gray-800 font-semibold">{property.area} sqft</p>
              <span className="text-sm text-gray-500">Area</span>
            </div>
          </div>
  
          {/* Description */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">About this property</h2>
            <p className="text-gray-600 leading-relaxed">{property.detailedDesc}</p>
          </div>
        </div>
  
        {/* Right: Booking + Map */}
        <div className="space-y-8">
          {/* Booking Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
      {!isBooked ? (
        <div className="flex justify-between">
          <BookVisitDialog onDateSelect={handleDateSelection} />
          <Button className={'bg-green-500 '} onClick={handleRating}>Rate Your Visit</Button>
          {isOpen && (
            <div>
              <RatingModal  open={isOpen} onClose={()=>setIsOpen(false)} onSubmit={handleSubmit}/>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700 font-medium">
            Your visit is already booked for date {date ? format(date, "PPP") : ""}
          </p>
          <div className="flex justify-between">
          <Button
            onClick={handleCancelBooking}
            variant="outline"
            className=" border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel Booking
          </Button>
          <Button className={'bg-amber-400 text-gray-900 hover:bg-amber-300'}>Completed Visit</Button>
          </div>
        </div>
      )}
    </div>
  
          {/* Map */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-80">
            <Map address={property.address} city={property.city} country={property.country} />
          </div>
        </div>
      </div>
    </div>
  )
  
}
