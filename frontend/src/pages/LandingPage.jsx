import React from 'react'
import NavBar from '../componentsLib/LandingPageComps/NavBar.jsx'
import Hero from '../componentsLib/LandingPageComps/Hero.jsx'
import FeatureCards from '../componentsLib/LandingPageComps/FeatureCards.jsx'

import CarouselPage from '../componentsLib/LandingPageComps/CarouselPage.jsx'
import Category from '../componentsLib/LandingPageComps/Category.jsx'
import Testimonials from '../componentsLib/LandingPageComps/Testimonials.jsx'
import { motion } from 'framer-motion'

function LandingPage() {
  return (
    <motion.div

    initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}

    
    
    >
        <div className='fixed bg-white backdrop-blur-2xl top-0 left-0 w-full z-50  shadow'><NavBar/></div>
        
        <Hero/>
        <FeatureCards/>
        <CarouselPage/>
        <Category/>
        <Testimonials/>

      
    </motion.div>
  )
}

export default LandingPage
