import React from 'react'
import NavBar from '../componentsLib/LandingPageComps/NavBar.jsx'
import Hero from '../componentsLib/LandingPageComps/Hero.jsx'
import FeatureCards from '../componentsLib/LandingPageComps/FeatureCards.jsx'

function LandingPage() {
  return (
    <div>
        <div className='fixed bg-white backdrop-blur-2xl top-0 left-0 w-full z-50  shadow'><NavBar/></div>
        
        <Hero/>
        <FeatureCards/>
      
    </div>
  )
}

export default LandingPage
