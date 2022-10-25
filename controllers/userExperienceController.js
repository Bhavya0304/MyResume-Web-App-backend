const User = require('../models/User');
const Response = require('../classes/Response');
const MapPaths = require('../classes/Mappaths');

module.exports = {
    get:(req,res)=>{
        var username = req.params.id;
        if(!username){
            username = "bhavya0304";
        }
        User.getUserId(username).then((user)=>{
            if(!user){
                var responseData = new Response({Status:404,Error:"No user found!"});
                res.send(responseData.getResponse());
            }
            else{
                User.getUserExperience(user._id).then((data)=>{
                    var mp = new MapPaths(req.protocol+"://"+ req.get('host'));
                    data.map((value)=>{
                        value.logo = mp.getExpirenceImage(username,value.logo);
                        return value;  
                    });
                    var responseData = new Response({Status:200,Data:{Data:data}});
                    res.send(responseData.getResponse());
                }).catch((error)=>{
                    var responseData = new Response({Status:501,Error:error});
                    res.send(responseData.getResponse());
                })
            }
        }).catch((error)=>{
            var responseData = new Response({Status:501,Error:error});
            res.send(responseData.getResponse());
        });
       
    }
};