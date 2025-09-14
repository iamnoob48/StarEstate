import Carousel from "@/components/ui/carousel";
import React from "react";

function CarouselPage() {
  const carouselData = [
    { title: "1. House of Your Location", button: "See Now", src: "/images/House1.jpg" },
    { title: "2. House of Your Location", button: "See Now", src: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "3. House of Your Location", button: "See Now", src: "/images/house3.jpg" },
    { title: "4. House of Your Location", button: "See Now", src: "https://images.unsplash.com/photo-1632398414290-15262b0ec12d?q=80&w=1268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  return (
    <section className="relative w-full py-16 bg-gray-200">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 font-sans">
          Trending Page 
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the most popular properties people are looking at right now
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <Carousel slides={carouselData} />
      </div>
    </section>
  );
}

export default CarouselPage;

