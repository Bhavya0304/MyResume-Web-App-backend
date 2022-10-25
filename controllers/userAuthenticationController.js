const User = require('../models/User');
const Response = require('../classes/Response');
const Utils = require('../classes/Utils');

module.exports = {
    post:(req,res)=>{
        var username = req.body.username;
        var password = req.body.password;
        User.getUserId(username).then((user)=>{
            if(!user){
                var responseData = new Response({Status:404,Error:"User not found!"});
                res.send(responseData.getResponse());
            }
            else{
                var verify = Utils.validPassword(password,user.password,user.salt);
                if(verify){
                    
                    var jwt = Utils.issueJWT(user);
                    var responseData = new Response({Status:200,Data:jwt});
                    res.send(responseData.getResponse());
                }
                else{
                    var responseData = new Response({Status:404,Error:"User not found!"});
                    res.send(responseData.getResponse());
                }
            }
        }).catch((error)=>{
            var responseData = new Response({Status:501,Error:error});
            res.send(responseData.getResponse());
        });
    },
    get:(req,res)=>{
        var responseData = new Response({Status:200,Data:"Verified"});
        res.send(responseData.getResponse());
    }
}