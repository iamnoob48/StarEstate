import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'
import passport from 'passport'

const router = express.Router();

//For register
router.post('/register', async (req,res)=>{
    //We need to extract data from request
    const {email, username, gender, password} = req.body;
    const hashedPass = bcrypt.hashSync(password, 8);

    try{
        const user = await prisma.user.create({
            data : {
                email:email,
                username:username,
                gender : gender.toUpperCase(),
                password : hashedPass

            }
        })
        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET_KEY, {expiresIn : '24h'});
        res.json({token, username:user.username});



    }catch(err){
        console.log(err);
        res.json({message : err});
    }
})

//For login route
router.post('/login', async (req,res)=>{
    const {email, password} = req.body;


        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(!user ){return res.status(401).json({message: "Invalid email ID"})}
        const checkPass = bcrypt.compareSync(password, user.password);
        if(!checkPass){return res.status(401).json({message: "Invalid password"}) }

        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET_KEY, {expiresIn : '24h'});
        res.json({token, username:user.username});

    
})

//For google oauth
router.get('/google',
 
passport.authenticate('google', {scope : ['profile', 'email']}) )

router.get('/google/callback', passport.authenticate('google', {session : false}), (req,res)=>{
    
    try {
        const token = jwt.sign({id: req.user.id}, process.env.JWT_SECRET_KEY, {expiresIn:'24h'});
        res.redirect(`http://localhost:5173/success?token=${token}`)

        
    } catch (error) {
        console.log(error);
        res.redirect('http://localhost:5173/login');
        
    }




})









export default router