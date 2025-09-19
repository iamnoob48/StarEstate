
import { useEffect, useState} from "react";
import BuyersCard from "./BuyersCard";



function Properties({propertyData}) {
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h2>

      <BuyersCard properties={propertyData}/>
    </div>
  );
}

export default Properties;
