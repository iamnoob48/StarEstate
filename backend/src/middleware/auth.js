import jwt from 'jsonwebtoken'


function auth(req,res,next){
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded)=>{
        if(err){ return res.status(401).json({message: "Token did not match"})};
        req.userId = decoded.id;
        next();
    })

}

export default auth;