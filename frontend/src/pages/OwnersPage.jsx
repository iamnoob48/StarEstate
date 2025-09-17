import React from 'react'
import OwnersHero from '../componentsLib/OwnersComponets/OwnersHero'
import NavBar from '../componentsLib/LandingPageComps/NavBar'
import OwnersGrid from '../componentsLib/OwnersComponets/OwnersGrid'

function OwnersPage() {
  return (
    <div>
        <div className="fixed top-0 left-0 w-full z-40 bg-white backdrop-blur-2xl shadow">
        <NavBar />
      </div>
       <div className='z-[100]'><OwnersHero/></div>
        <OwnersGrid/>
      
    </div>
  )
}

export default OwnersPage
