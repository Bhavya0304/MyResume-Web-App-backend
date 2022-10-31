const Response = require('../classes/Response');
const jwt = require('jsonwebtoken');


exports.decodeToken = (req,res,next)=>{
    const token = req.header('authorization');
    if(!token){
        var responseData = new Response({Status:401,Error:"Unauthorized"});
        res.status(401).send(responseData.getResponse());
    }
    else{
        tokenParts = token.split(' ');
        if(tokenParts.length < 2 || tokenParts[0] != "Bearer"){
            var responseData = new Response({Status:401,Error:"Invalid Token"});
            res.status(401).send(responseData.getResponse());
        }
        else{
            try{
                var decoded = jwt.verify(tokenParts[1], process.env.SECRET_KEY,{algorithms:"HS256"});
                req.body.payload = decoded;
                next();
            }
            catch(e){
                var responseData = new Response({Status:401,Error:e.toString()});
                res.status(401).send(responseData.getResponse());
            }
        }
    }
}