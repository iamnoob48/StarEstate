import express from 'express'
import prisma from '../prismaClient.js';

const router = express.Router()

router.get('/',async (req,res)=>{
    try {
        const tenantProperties = await prisma.property.findMany({
            where : {
                propertyType : 'Rent',
                isDeleted : false
            }
        })
        res.json(tenantProperties)
        
    } catch (error) {
        res.status(500).json({message : "Something went terribly fucking wrong"})
        
    }
})




export default router