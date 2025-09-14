import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import session from 'express-session'
import prisma from '../prismaClient.js'




passport.use(new GoogleStrategy ({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : '/auth/google/callback'
},
    async (accessToken, refresdhToken, profile, cb)=>{
        try {
            let baseUsername = profile.displayName.replace(/\s+/g, '');
            let userName = baseUsername;

            
            
            let user = await prisma.user.findUnique({
                where: {
                    googleId : profile.id
                }
            })
            let existingUser = await prisma.user.findUnique({
                where : {
                    username : userName
                }
            })
            if(existingUser){
                const suffix = Math.floor(10 + Math.random() * 90);
                userName = `${baseUsername}${suffix}`;
            }
            if (!user) {
                // fallback: check by email
                user = await prisma.user.findUnique({
                  where: { email: profile.emails[0].value }
                })
              }

            if(!user){
                user = await prisma.user.create({
                    data : {
                        googleId : profile.id,
                        username : userName,
                        email : profile.emails[0].value
                    }
                })
            }
            return cb(null, user)
            
            
        } catch (error) {
            return cb(error, null)
            
        }
        

        

    }
    


))

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    try {
        const user = await prisma.user.findUnique({ where: { id } })
        done(null, user)
      } catch (err) {
        done(err, null)
      }
})