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
        res.json(user);
        
    } catch (err) {
        res.send(500).json({message:"Server Problem"})
        
    }
})

//For getting users
router.get('/users', async(req,res)=>{
    try {
        const user = await prisma.user.findMany({
            where : {
                id : {not : req.userId}
            }
        })
        res.json(user);
    } catch (error) {
        res.send(500).json({message: "Internal isssue"})
        
    }
})



export default router;