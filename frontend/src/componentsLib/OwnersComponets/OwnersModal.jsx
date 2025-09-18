import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";

function SortableImage({ image, index, removeImage }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={image.preview}
        alt="preview"
        className="w-24 h-24 object-cover rounded"
      />
      <button
        onClick={() => removeImage(index)}
        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:cursor-pointer"
      >
        ✖
      </button>
    </div>
  );
}

export default function OwnersModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Property Details
    title: "",
    smallDesc: "",
    detailedDesc: "",
    price: "",
    propertyType: "Rent",      // Rent / Sale
    propertyCategory: "Apartment", // Apartment / House / Land / etc.
    area: "",                  // in sqft or sq.m
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    floor: "",
    totalFloors: "",
    furnishing: "",            // e.g., Furnished, Semi-Furnished, Unfurnished
    parking: "",               // e.g., 1 Car, 2 Bike, None
  
    // Step 2: Location
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmarks: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    preferredContact: "phone",
  
    // Step 3: Images
    images: [],
     // phone / email / whatsapp
  });
  

  const sensors = useSensors(useSensor(PointerSensor));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => ({
      id: crypto.randomUUID(), // unique id
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...filePreviews],
    }));
  };
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = active.id;
      const newIndex = over.id;
      setFormData((prev) => ({
        ...prev,
        images: arrayMove(prev.images, oldIndex, newIndex),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         const {title, smallDesc, detailedDesc,price, propertyType, propertyCategory,area, bedrooms, bathrooms, balconies, floor, totalFloors, furnishing, parking, contactName, contactPhone, contactEmail, preferredContact, address, city, state, pincode, landmarks} = formData;
         const response = await fetch('/property/data', {
            method : "POST",
            headers : {'Authorization' : token,
                        'Content-Type' : 'application/json'
                      },
            body: JSON.stringify({
                        title: title,
                        smallDesc: smallDesc,
                        detailedDesc: detailedDesc,
                        price: parseInt(price),
                        propertyType: propertyType,
                        propertyCategory: propertyCategory,
                        area: parseInt(area),
                        bedrooms: parseInt(bedrooms),
                        bathrooms: parseInt(bathrooms),
                        balconies: parseInt(balconies),
                        floor: parseInt(floor),
                        totalFloors: parseInt(totalFloors),
                        furnishing: furnishing,
                        parking: parking,
                        address: address,
                        city: city,
                        state: state,
                        pincode: pincode,
                        landmarks: landmarks,
                        contactName: contactName,
                        contactPhone: contactPhone,
                        contactEmail: contactEmail,
                        preferredContact: preferredContact
                      })
                      
         });

         const data = await response.json();
         setCardData(prev => [...prev,data]);
         setIsOpen(false);

        
    } catch (err) {
        console.log(err)
        
        
    }

  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className=" p-6">
      {token ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-amber-200/50 transform hover:scale-105 transition-all duration-200"
        >
          List Your First Property
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-amber-200/50 transform hover:scale-105 transition-all duration-200"
        >
          List Your First Property
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center z-[9999] items-center  p-4">
          <div className= "bg-white w-full max-w-2xl z-[100] max-h-[90vh] rounded-3xl shadow-2xl relative overflow-hidden border border-amber-100 flex flex-col">
            {/* Decorative header with gradient */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100 flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-600 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Property Listing</h2>
              <p className="text-sm text-gray-600">Share your property with potential buyers and renters</p>
            </div>

            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 font-semibold text-xs">{step}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Step {step} of 5</p>
                      <p className="text-base font-semibold text-gray-800">
                        {step === 1 && "Property Details"}
                        {step === 2 && "Property Specs"}
                        {step === 3 && "Location Details"}
                        {step === 4 && "Contact Info"}
                        {step === 5 && "Upload Images"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{Math.round((step / 5) * 100)}% Complete</p>
                  </div>
                </div>

                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-amber-400 to-amber-500 ${
                      step === 1
                        ? "w-1/5"
                        : step === 2
                          ? "w-2/5"
                          : step === 3
                            ? "w-3/5"
                            : step === 4
                              ? "w-4/5"
                              : "w-full"
                    }`}
                  ></div>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Property Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter a catchy title for your property"
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Quick Description</label>
                    <textarea
                      name="smallDesc"
                      placeholder="Brief overview (e.g., 4BHK, 4 Bathrooms, Modern Amenities)"
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400 h-20 resize-none"
                      value={formData.smallDesc}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Detailed Description</label>
                    <textarea
                      name="detailedDesc"
                      placeholder="Provide comprehensive details about your property..."
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400 h-24 resize-none"
                      value={formData.detailedDesc}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                          ₹
                        </span>
                        <input
                          type="number"
                          name="price"
                          placeholder="0"
                          className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 pl-7 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Listing Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 bg-white"
                      >
                        <option value="Rent">Rent</option>
                        <option value="Sale">Sale</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Property Category</label>
                    <select
                      name="propertyCategory"
                      value={formData.propertyCategory}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 bg-white"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Farmhouse">Farmhouse</option>
                      <option value="Land">Land</option>
                      <option value="Commeercial">Commercial</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Built-up Area</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="area"
                        placeholder="0"
                        className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 pr-14 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                        value={formData.area}
                        onChange={handleChange}
                        min="0"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        sq ft
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        placeholder="0"
                        className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Bathrooms</label>
                      <input
                        type="number"
                        name="bathrooms"
                        placeholder="0"
                        className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Balconies</label>
                      <input
                        type="number"
                        name="balconies"
                        placeholder="0"
                        className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                        value={formData.balconies}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Floor Number</label>
                      <input
                        type="number"
                        name="floor"
                        placeholder="0"
                        className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                        value={formData.floor}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Total Floors in Building</label>
                    <input
                      type="number"
                      name="totalFloors"
                      placeholder="0"
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={formData.totalFloors}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Furnishing Status</label>
                    <select
                      name="furnishing"
                      value={formData.furnishing}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 bg-white"
                    >
                      <option value="">Select furnishing status</option>
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Fully-Furnished">Fully-Furnished</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Parking Slots</label>
                    <input
                      type="number"
                      name="parking"
                      placeholder="0"
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={formData.parking}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter complete street address"
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                        value={formData.pincode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Nearby Landmarks</label>
                    <input
                      type="text"
                      name="landmarks"
                      placeholder="Schools, hospitals, metro stations, etc. (optional)"
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={formData.landmarks}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Your Name</label>
                    <input
                      type="text"
                      name="contactName"
                      placeholder="Enter your full name"
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={formData.contactName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={formData.contactPhone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="contactEmail"
                      placeholder="your.email@example.com"
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={formData.contactEmail}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Preferred Contact Method</label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 p-3 rounded-xl transition-all duration-200 text-gray-800 bg-white"
                    >
                      <option value="phone">Phone Call</option>
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Upload Property Images</h3>
                    <p className="text-gray-600 text-sm">Add high-quality photos to attract more buyers</p>
                  </div>

                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-40 border-3 border-dashed border-amber-300 rounded-2xl cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 text-gray-600 bg-gradient-to-br from-amber-25 to-orange-25"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 004 4h10a4 4 0 004-4M16 5l-4-4-4 4m4-4v12"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-semibold text-base mb-1">Click or Drag & Drop Images Here</span>
                    <span className="text-gray-500 text-xs">Support for multiple images • JPG, PNG, WEBP</span>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                      items={formData.images.map((_, idx) => idx)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {formData.images.map((img, idx) => (
                          <SortableImage key={idx} image={img} index={idx} removeImage={removeImage} />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-white flex-shrink-0">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 5 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-amber-200/50 transform hover:scale-105 transition-all duration-200"
                >
                  <span>Continue</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-green-200/50 transform hover:scale-105 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Publish Listing</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
