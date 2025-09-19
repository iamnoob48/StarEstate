import React from 'react'
import NavBar from '../componentsLib/LandingPageComps/NavBar'
import BuyersHero from '../componentsLib/BuyersComponets/BuyersHero'
import Properties from '../componentsLib/BuyersComponets/Properties'
import Pagination from '../componentsLib/Reusable/Pagination'
import { useState, useEffect } from 'react'
import { Route } from 'lucide-react'
import PropertyDetailsPage from '../componentsLib/BuyersComponets/PropertyDetailsPage'
function BuyersPage() {
  const [propertyData, setPropertyData] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async (category="")=>{
    const res = await fetch(`/buyersData?category=${category}`, {
      headers : {'Authorization' : token, 'Content-Type' : 'application/json'}
    })
    const data = await res.json();
    setPropertyData(data); 
  }

  useEffect(()=>{
    fetchData();

  },[token])
  return (
    <div>
        <div className='fixed bg-white backdrop-blur-2xl top-0 left-0 w-full z-50  shadow'><NavBar/></div>
        <div>
            <BuyersHero fetchData={fetchData} />
            <Properties propertyData={propertyData}/>
            <Pagination/>
            

      
        </div>
    </div>
  )
}

export default BuyersPage
