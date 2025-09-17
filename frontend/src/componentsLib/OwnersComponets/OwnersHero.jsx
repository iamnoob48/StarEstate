import React from 'react'
import { motion } from 'framer-motion'
import OwnersModal from './OwnersModal'

function OwnersHero() {
  return (
    <div>
        <motion.section className="relative w-full h-[80vh] flex items-center justify-center text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        
        
        >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/bg-image.jpg" // replace with your background image
          alt="Owners Dashboard Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-amber-50/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg">
          Manage & List Your Properties
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Easily create, manage, and showcase your property listings in one
          place. Start listing today and connect with buyers & tenants.
        </p>
        <div className='flex justify-center'>
        <OwnersModal/>
        </div>
        
      </div>
    </motion.section>
      
    </div>
  )
}

export default OwnersHero
