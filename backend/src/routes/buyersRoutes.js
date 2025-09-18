import express from 'express'
import prisma from '../prismaClient.js';


const router = express.Router();


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
  



export default router