
const jwt = require('jsonwebtoken');


exports.decodeToken = (req,res,next)=>{
    const token = req.header('authorization');
    if(!token){
        next();
    }
    else{
        tokenParts = token.split(' ');
        if(tokenParts.length < 2 || tokenParts[0] != "Bearer"){
            next();
        }
        else{
            try{
                var decoded = jwt.verify(tokenParts[1], process.env.SECRET_KEY,{algorithms:"HS256"});
                req.body.payload = decoded;
                next();
            }
            catch(e){
                var responseData = new Response({Status:401,Error:"Unauthorized!"});
                res.send(responseData.getResponse());
            }
        }
    }
}