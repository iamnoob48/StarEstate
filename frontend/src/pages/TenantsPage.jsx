import React, { useEffect, useState } from 'react'
import NavBar from '../componentsLib/LandingPageComps/NavBar'
import TenantsHero from '../componentsLib/TenantsComps/TenantsHero'
import FilterSideBar from '../componentsLib/TenantsComps/FilterSideBar'
import TenantProperties from '../componentsLib/TenantsComps/TenantProperties';

function TenantsPage() {
  const token = localStorage.getItem('token')
  const [propetyData, setPropertyData] = useState([]);
  const fetchData = async ()=>{
    const res = await fetch(`/tenantData`, {
      headers : {'Authorization' : token}
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
        <TenantsHero  />
        <div className='flex ml-7 mt-5'>
          <FilterSideBar/>
          <TenantProperties propertyData={propetyData}/>

        </div>
      
    </div>
  )
}

export default TenantsPage
