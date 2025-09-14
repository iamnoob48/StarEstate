import React from 'react'
import NavBar from '../componentsLib/LandingPageComps/NavBar'
import BuyersHero from '../componentsLib/BuyersComponets/BuyersHero'
import Properties from '../componentsLib/BuyersComponets/Properties'
import Pagination from '../componentsLib/Reusable/Pagination'
function BuyersPage() {
  return (
    <div>
        <div className='fixed bg-white backdrop-blur-2xl top-0 left-0 w-full z-50  shadow'><NavBar/></div>
        <div>
            <BuyersHero/>
            <Properties/>
            <Pagination/>

      
        </div>
    </div>
  )
}

export default BuyersPage
