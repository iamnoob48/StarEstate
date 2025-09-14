import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

function Testimonials() {
  const testimonials = [
    {
      name: "Anjali Sharma",
      title: "Home Buyer",
      quote:
        "StarEstate helped me find my dream apartment quickly and easily. The platform made the entire process stress-free.",
     
    },
    {
      name: "Ravi Patel",
      title: "Property Seller",
      quote:
        "I listed my property here and got multiple inquiries within a week. The social features make it very engaging!",
    
    },
    {
      name: "Sophia Thomas",
      title: "Tenant",
      quote:
        "Finding a rental was super smooth. I loved how easy it was to filter by budget and location.",
    },
    {
      name: "Arjun Verma",
      title: "Investor",
      quote:
        "A clean platform with modern design. I could easily browse plots and shortlist properties worth investing in.",
    
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">What Our Users Say</h2>
        <p className="mt-3 text-lg text-gray-600">
          Real stories from buyers, sellers, and tenants who trusted StarEstate.
        </p>
      </div>

      <div className="">
        <InfiniteMovingCards items={testimonials} direction="right" speed="slow"/>

      </div>
    </section>
  );
}

export default Testimonials;
