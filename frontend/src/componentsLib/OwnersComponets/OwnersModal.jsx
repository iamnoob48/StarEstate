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
    title: "",
    detailedDesc: "",
    smallDesc:"",
    price: "",
    propertyType: "Rent",
    propertyCategory: "Apartment",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmarks: "",
    images: [],
  });
  const [cardData, setCardData] = useState([]);

  const sensors = useSensors(useSensor(PointerSensor));
  const token = localStorage.getItem('token');

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
         const {title, smallDesc, detailedDesc,price, propertyType, propertyCategory, address, city, pincode, landmarks} = formData;
         const response = await fetch('/property/data', {
            method : "POST",
            headers : {'Authorization' : token,
                        'Content-Type' : 'application/json'
                      },
            body : JSON.stringify({title:title, smallDesc : smallDesc, detailedDesc : detailedDesc, price : price, propertyType : propertyType, propertyCategory : propertyCategory, address: address, city : city, pincode : pincode, landmarks : landmarks})
         });

         const data = await response.json();
         setCardData(prev => [...prev,data]);

        
    } catch (err) {
        console.log(err.message)
        
    }

  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-semibold shadow-lg hover:shadow-amber-200 hover:cursor-pointer transition"
      >
        List Your First Property
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Property</h2>
            {/* Step Indicator */}
            <div className="mb-6">
            <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                <span>Step {step} of 3</span>
                <span>
                {step === 1 && "Property Details"}
                {step === 2 && "Location Info"}
                {step === 3 && "Upload Images"}
                </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
                <div
                className={`h-2 rounded transition-all duration-300 ${
                    step === 1 ? "w-1/3 bg-amber-400" : step === 2 ? "w-2/3 bg-amber-400" : "w-full bg-amber-400"
                }`}
                ></div>
            </div>
            </div>
            {step === 1 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="w-full border p-2 rounded"
                  value={formData.title}
                  onChange={handleChange}
                />
                <textarea
                  name="detailedDesc"
                  placeholder="Small Description(ex : 4BHK, 4 Bathrooms etc..)"
                  className="w-full border p-2 rounded"
                  value={formData.smallDesc}
                  onChange={handleChange}
                />
        
                <textarea
                  name="detailedDesc"
                  placeholder="Detailed Description"
                  className="w-full border p-2 rounded"
                  value={formData.detailedDesc}
                  onChange={handleChange}
                />
                <div className="flex gap-4">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-1/2 border p-2 rounded"
                    value={formData.price}
                    onChange={handleChange}
                    min='0'
                
                  />
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-1/2 border p-2 rounded"
                  >
                    <option value="Rent">Rent</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>
                <select
                  name="propertyCategory"
                  value={formData.propertyCategory}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Farmhouse">Farmhouse</option>
                  <option value="Land">Land</option>
                  <option value="Commeercial">Commercial</option>
                </select>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  className="w-full border p-2 rounded"
                  value={formData.address}
                  onChange={handleChange}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-1/3 border p-2 rounded"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="w-1/3 border p-2 rounded"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    className="w-1/3 border p-2 rounded"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="text"
                  name="landmarks"
                  placeholder="Nearby Landmarks (optional)"
                  className="w-full border p-2 rounded"
                  value={formData.landmarks}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Step 3: Image Upload with DnD */}
            {step === 3 && (
  <div className="space-y-4">
    {/* Styled Drag & Drop Upload Area */}
    <label
      htmlFor="file-upload"
      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-2 text-gray-400"
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
      <span className="text-gray-600 font-medium">
        Click or Drag & Drop Images Here
      </span>
      <input
        id="file-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </label>

    {/* DnD Image Preview */}
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={formData.images.map((_, idx) => idx)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {formData.images.map((img, idx) => (
            <SortableImage
              key={idx}
              image={img}
              index={idx}
              removeImage={removeImage}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  </div>
)}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="ml-auto px-4 py-2 bg-amber-400 text-white rounded hover:bg-amber-500"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="ml-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
