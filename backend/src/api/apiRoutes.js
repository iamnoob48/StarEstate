import express from 'express'
import prisma from '../prismaClient.js';

const router = express.Router();

//We need to sent the user data
router.get('/userdata', async (req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : req.userId

            }
        })
        res.json({username:user.username})
        
    } catch (err) {
        res.send(500).json({message:"Server Problem"})
        
    }
})



export default router;