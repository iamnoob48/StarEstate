import React from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";

function Category() {
  const categories = [
    {
      title: "Apartments",
      description: "Modern flats and apartments for every budget.",
      link: "/categories/apartments",
    },
    {
      title: "Independent Houses",
      description: "Spacious homes for families in prime locations.",
      link: "/categories/houses",
    },
    {
      title: "Land & Plots",
      description: "Find open lands and plots for investment or building.",
      link: "/categories/land",
    },
    {
      title: "Commercial Spaces",
      description: "Offices, shops, and coworking spaces for business.",
      link: "/categories/commercial",
    },
    {
      title: "Luxury Villas",
      description: "Exclusive high-end villas for premium living.",
      link: "/categories/villas",
    },
    {
      title: "Rental Homes",
      description: "Affordable homes and apartments for tenants.",
      link: "/categories/rentals",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Browse by Category</h2>
        <p className="mt-3 text-lg text-gray-600">
          Explore properties tailored to your needs — whether you want to buy,
          rent, or invest.
        </p>
      </div>
      <HoverEffect items={categories} />
    </section>
  );
}

export default Category;
