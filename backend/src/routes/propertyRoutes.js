import express from 'express'
import prisma from '../prismaClient.js';

const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        const prop = await prisma.property.findMany({
            where : {
                user_id:req.userId,
                isDeleted : false
            }
        })
        res.json(prop);
        
    } catch (err) {
        console.log(err);
        
    }
    
})

//For post req
router.post('/data',async (req,res)=>{
    const {title, smallDesc, detailedDesc,price, propertyType, propertyCategory,area, bedrooms, bathrooms, balconies, floor, totalFloors, furnishing, parking, contactName, contactPhone, contactEmail,  address, city, state, pincode, landmarks} = req.body;
    try {
       const newProps = await prisma.property.create({
            data : {
                title:title, 
                smallDesc : smallDesc, 
                detailedDesc : detailedDesc, 
                price : price, 
                propertyType : propertyType, 
                category : propertyCategory,
                area : area,
                bedrooms : bedrooms,
                bathrooms : bathrooms,
                balconies : balconies,
                floor : floor,
                totalFloors : totalFloors,
                furnishing : furnishing,
                parking : parking,
                address: address, 
                city : city,
                state : state,
                pincode : pincode, 
                landmarks : landmarks,
                contactName: contactName,
                contactPhone: contactPhone,
                contactEmail: contactEmail,
                user: { connect: { id: req.userId } }

            }
        })
        res.json(newProps);
        
    } catch (err) {
        console.log(err);
        
    }
})

//For prop details
router.get('/:id', async (req,res)=>{
    const {id} = req.params
    try {
        const prop = await prisma.property.findFirst({
            where : {
                user_id : req.userId,
                id : parseInt(id)
            }
        })
        if(!prop){return res.status(501).json({message : "Property not found"})}
        res.json(prop)
        
    } catch (error) {
        res.status(500).json({message: error})
        
    }
})

//For updation
router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const {title, smallDesc, detailedDesc,price, propertyType, propertyCategory,area, bedrooms, bathrooms, balconies, floor, totalFloors, furnishing, parking, contactName, contactPhone, contactEmail, address, city, state, pincode, landmarks} = req.body;
    try {
        const properties = await prisma.property.update({
            where : {
                user_id : req.userId,
                id : parseInt(id),


            },
            data : {
                title:title, 
                smallDesc : smallDesc, 
                detailedDesc : detailedDesc, 
                price : price, 
                propertyType : propertyType, 
                category : propertyCategory,
                area : area,
                bedrooms : bedrooms,
                bathrooms : bathrooms,
                balconies : balconies,
                floor : floor,
                totalFloors : totalFloors,
                furnishing : furnishing,
                parking : parking,
                address: address, 
                city : city,
                state : state,
                pincode : pincode, 
                landmarks : landmarks,
                contactName: contactName,
                contactPhone: contactPhone,
                contactEmail: contactEmail,


            }
        })
        res.json(properties);

        
    } catch (err) {
        res.status(501).json({message:"Something Went Wrong"})
        
    }
})

router.delete('/:id',async (req,res)=>{
    const {isDeleted} = req.body;
    const {id} = req.params

    await prisma.property.update({
        where : {
            user_id : req.userId,
            id : parseInt(id),


        },
        data : {
            isDeleted : isDeleted
        }
    })
    res.json({message :'Property Deleted'});

})



export default router;