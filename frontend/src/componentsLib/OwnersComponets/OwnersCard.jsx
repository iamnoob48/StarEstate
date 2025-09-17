import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

function OwnersCard({p, idx}) {
    const navigate = useNavigate();
  return (
    <div>
             <div>
             <motion.div
                 key={p.id}
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
               >
                 <img
                  src='/images/villa.jpg'
                   alt={p.title}
                   className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                 />
                 <div className="p-4">
                   <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>
                   <div className='flex justify-between'>
                     <p className="text-gray-500 text-sm mt-1">{p.smallDesc}</p>
                     <p className='text-right '>{p.category}</p>
                   </div>
                   <div className='flex justify-between mt-4'>
                   <p className="text-amber-500 font-semibold mt-3">{'₹' + p.price}</p>
                   <button className='bg-amber-400 p-1 rounded-lg' onClick={()=> navigate(`/owners/property/${p.id}`)}>View Details</button>
                   </div>
                   
                 </div>
               </motion.div>
           
         </div>
    </div>
   
  )
}

export default OwnersCard
