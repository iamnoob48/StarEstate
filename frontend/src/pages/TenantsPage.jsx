import React from 'react'
import NavBar from '../componentsLib/LandingPageComps/NavBar'
import TenantsHero from '../componentsLib/TenantsComps/TenantsHero'

function TenantsPage() {
    // const fetchData =  async()=>{
        

    // }

  return (
    <div>
        <div className='fixed bg-white backdrop-blur-2xl top-0 left-0 w-full z-50  shadow'><NavBar/></div>
        <TenantsHero />
      
    </div>
  )
}

export default TenantsPage
