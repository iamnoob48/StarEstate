import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../componentsLib/LandingPageComps/NavBar";
import { FaTrash } from "react-icons/fa";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    detailedDesc: "",
    smallDesc: "",
    price: "",
    propertyType: "",
    propertyCategory:"",
    area : "",
    bedrooms : "",
    bathrooms : "",
    balconies : "",
    floor : "",
    totalFloors : "",
    furnishing : "",
    parking : "",


    address: "",
    city: "",
    state: "",
    pincode: "",
    landmarks: "",
    images: [],
  });
  const fetchProperty = async () => {
    try {
      const res = await fetch(`/property/${id}`, {
        headers: { 'Authorization': token },
      });
      const data = await res.json();
      setProperty(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev =>( {...prev, [name] : value}))

  }
  const handleSave = async ()=> {
    const {title, smallDesc, detailedDesc,price, propertyType, propertyCategory, address, city, state, pincode, landmarks} = formData;
    const response = await fetch(`/property/${id}`,{
        method : 'PUT',
        headers : {'Authorization' : token, 'Content-Type' : 'application/json'},
        body : JSON.stringify({title: title, smallDesc : smallDesc, detailedDesc : detailedDesc, price : parseInt(price), propertyType : propertyType, propertyCategory : propertyCategory, address: address, city : city, state: state, pincode : pincode, landmarks : landmarks})
    })
    const data = await response.json();
    setProperty(data);
    setIsEditing(false);


  }
  const handleDelete = async ()=>{
    try {
        const isDeleted = true
        await fetch(`/property/${id}`,{
            method : 'DELETE',
            headers : {'Authorization' : token, 'Content-Type' : 'application/json'},
            body : JSON.stringify({isDeleted : isDeleted})
        })
        setIsDelete(true);
        navigate('/owners')

        
    } catch (error) {
        console.log(error);
        
    }

  }

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        detailedDesc: property.detailedDesc || "",
        smallDesc: property.smallDesc || "",
        price: property.price || "",
        propertyType: property.propertyType || "",
        propertyCategory: property.category || "",
  
        area: property.area || "",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        balconies: property.balconies || "",
        floor: property.floor || "",
        totalFloors: property.totalFloors || "",
        furnishing: property.furnishing || "",
        parking: property.parking || "",
  
        address: property.address || "",
        city: property.city || "",
        state: property.state || "",
        pincode: property.pincode || "",
        landmarks: property.landmarks || "",
      });
    }
  }, [property]);
  
  useEffect(() => {
    
    
    fetchProperty();
  }, [id, token]);

  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading property details...</p>
      </div>
    );
  }


  return (
    
    <div>
        <div className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-2xl shadow">
        <NavBar />
      </div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 md:p-12 bg-white shadow-lg rounded-2xl mt-20"
    >
      {/* Header Image */}
      <div className="relative overflow-hidden rounded-xl mb-8">
        <img
          src="/images/villa.jpg" // fallback, replace with property.images[0].url when ready
          alt={formData.title}
          className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
        />
         <div className="absolute top-4 right-4 flex gap-3">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              <FaTrash />
            </button>
          </div>
      </div>
      
      
      

      {/* Title */}
      <label>Title</label>
      <input type="text"
        name="title"
        value={formData.title}
        readOnly={!isEditing}
        className={`w-full p-3 rounded-lg border ${
          isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"

        }`}
        onChange={handleChange}
        />
       
     

      {/* Details Form (Read Only Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-gray-600 mb-2">Small Description</label>
          <input
            name="smallDesc"
            type="text"
            value={formData.smallDesc}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Category</label>
          <input
            type="text"
            name="propertyCategory"
            value={formData.propertyCategory}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-600 mb-2">Detailed Description</label>
          <textarea
            name="detailedDesc"
            value={formData.detailedDesc}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Price</label>
          <input
            name="price"
            type='number'
            value={formData.price}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Property Type</label>
          <input
            name="propertyType"
            type="text"
            value={formData.propertyType}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>
        <div>
    <label className="block text-gray-600 mb-2">Area (sq.ft)</label>
    <input
      name="area"
      type="number"
      value={formData.area}
      readOnly={!isEditing}
      className={`w-full p-3 rounded-lg border ${
        isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
      }`}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-2">Bedrooms</label>
    <input
      name="bedrooms"
      type="number"
      value={formData.bedrooms}
      readOnly={!isEditing}
      className={`w-full p-3 rounded-lg border ${
        isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
      }`}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-2">Bathrooms</label>
    <input
      name="bathrooms"
      type="number"
      value={formData.bathrooms}
      readOnly={!isEditing}
      className={`w-full p-3 rounded-lg border ${
        isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
      }`}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-2">Balconies</label>
    <input
      name="balconies"
      type="number"
      value={formData.balconies}
      readOnly={!isEditing}
      className={`w-full p-3 rounded-lg border ${
        isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
      }`}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-2">Floor</label>
    <input
      name="floor"
      type="number"
      value={formData.floor}
      readOnly={!isEditing}
      className={`w-full p-3 rounded-lg border ${
        isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
      }`}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-2">Total Floors</label>
    <input
      name="totalFloors"
      type="number"
      value={formData.totalFloors}
      readOnly={!isEditing}
      className={`w-full p-3 rounded-lg border ${
        isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
      }`}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-2">Furnishing</label>
    <input
      name="furnishing"
      type="text"
      value={formData.furnishing}
      readOnly={!isEditing}
      className={`w-full p-3 rounded-lg border ${
        isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
      }`}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-2">Parking</label>
    <input
      name="parking"
      type="text"
      value={formData.parking}
      readOnly={!isEditing}
      className={`w-full p-3 rounded-lg border ${
        isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
      }`}
      onChange={handleChange}
    />
  </div>

        <div>
          <label className="block text-gray-600 mb-2">Address</label>
          <input
            name="address"
            type="text"
            value={formData.address}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">City</label>
          <input
           name="city"
            type="text"
            value={formData.city}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">State</label>
          <input
            name="state"
            type="text"
            value={formData.state}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Pincode</label>
          <input
            name="pincode"
            type="text"
            value={formData.pincode}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Landmarks</label>
          <input
            name="landmarks"
            type="text"
            value={formData.landmarks || ""}
            readOnly={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isEditing ? "border-amber-500 bg-white" : "border-gray-300 bg-gray-50"
            }`}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
    {isEditing && (
      <>
        <button
          onClick={() => setIsEditing(false)}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Save
        </button>
      </>
    )}
  </div>
    </motion.div>
    </div>
  );
}

export default PropertyDetails;
