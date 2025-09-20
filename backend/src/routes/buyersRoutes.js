import express from 'express'
import prisma from '../prismaClient.js';


const router = express.Router();
let count = 0;


//To get all the property data
router.get('/', async (req, res) => {
    const { category } = req.query; // ✅ use query instead of body
    try {
      const where = {
        propertyType: 'Sale',
        isDeleted: false,
        ...(category && { category }) // only add if present
      };
  
      const propertyData = await prisma.property.findMany({ where });
      res.json(propertyData);   // <-- response sent here
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });  // <-- response sent again if error occurs
    }
  });

  router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    try {
        const properties = await prisma.property.findFirst({
            where : {
                id : parseInt(id)
            }
        })
        if(!properties){return res.json({message:"Property not found"})}
        res.json(properties);

        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        
    }

  })

  router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { rating } = req.body
  
    try {
      if (rating > 0) {
        const property = await prisma.property.findUnique({
          where: { id: parseInt(id) },
          select: { rating: true, ratingCount: true }
        })
  
        if (!property) {
          return res.status(404).json({ message: "Property not found" })
        }
  
        // Compute new average
        const newCount = property.ratingCount + 1
        const newAvg =
          (property.rating * property.ratingCount + rating) / newCount
  
        await prisma.property.update({
          where: { id: parseInt(id) },
          data: {
            rating: newAvg,
            ratingCount: newCount
          }
        })
  
        return res.json({ message: "Rating has been updated", rating: newAvg })
      }
  
      res.status(400).json({ message: "Invalid rating" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Something went wrong" })
    }
  })
  
  



export default router