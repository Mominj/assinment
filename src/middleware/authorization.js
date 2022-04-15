const jwt = require('jsonwebtoken');
const config = require('../config/config')

const requireAuth =  (req,res,next)=>{
    // const token = req.cookies.jwt;
    const token = req.headers['authorization'];

    if(token){
        const bearer = token.split(' ');
        const bearerToken = bearer[1]
        console.log("token", bearerToken);
        req.token = bearerToken;
        // next();
        jwt.verify(bearerToken, config.jwt.accessTokenSecret,(err, decodedtoken)=>{
            if(err){
                console.log(err) 
                res.status(403).json({message : "error occur while decode token"})                                 
            }else{
                req.role = decodedtoken.role_id;
                req.email = decodedtoken.email;
                console.log(decodedtoken)
                next();
            }
        })
    }else{
        console.log("token  not found")
        res.status(500).json({message: "auth eror"});
    //    res.redirect('/auth/login');
    }
}
module.exports = requireAuth;
//authorization check means access ablity of a path check




