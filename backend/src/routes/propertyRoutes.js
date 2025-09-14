import express from 'express'

const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        await prisma.property.findUnique({
            where : {
                id:req.userId
            }
        })
        
    } catch (err) {
        console.log(err);
        
    }
    
})

//For post req
router.post('/data',async (req,res)=>{
    const {title, smallDesc, detailedDesc,price, propertyType, propertyCategory, address, city, pincode, landmarks} = req.body;
    try {
        const property = await prisma.property.create({
            where : {
                id : req.userId,
            },
            data : {
                title:title, 
                smallDesc : smallDesc, 
                detailedDesc : detailedDesc, 
                price : price, 
                propertyType : propertyType, 
                propertyCategory : propertyCategory, 
                address: address, 
                city : city,
                pincode : pincode, 
                landmarks : landmarks

            }
        })
        res.json({property});
        
    } catch (err) {
        console.log(err);
        
    }
})



export default router;