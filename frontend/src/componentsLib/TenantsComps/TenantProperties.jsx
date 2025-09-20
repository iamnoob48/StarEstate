import React from 'react'
import TenantCard from './TenantCard'

function TenantProperties({propertyData}) {
  return (
    <div>
        <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h2>

      <TenantCard properties={propertyData}/>
    </div>
      
    </div>
  )
}

export default TenantProperties
