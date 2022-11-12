const Response = require('../classes/Response');

module.exports = {
    passportCallback:(err,user)=>{
        if(err){
            var responseData = new Response({Status:401,Error:"Unauthorized"});
            return this.handler; 
        }
        if(!user){
            var responseData = new Response({Status:401,Error:"Unauthorized"});
            return this.handler;
        }
        return this.handlerNext;
    },
    handler:(req,res,next)=>{
        res.send(responseData.getResponse());
    },
    handlerNext:(req,res,next)=>{
        next();
    }
}