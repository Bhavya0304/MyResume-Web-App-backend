const User = require('../models/User');
const Response = require('../classes/Response');
const MapPaths = require('../classes/Mappaths');

module.exports = {
    get:(req,res)=>{
        User.getUserEducation().then((data)=>{
            var mp = new MapPaths(req.protocol+"://"+ req.get('host'));
            data.map((value)=>{
                value.logo = mp.getEducationImage(value.logo);
                return value;  
            });
            var responseData = new Response({Status:200,Data:{Data:data}});
            res.send(responseData.getResponse());
        }).catch((error)=>{
            var responseData = new Response({Status:501,Error:error});
            res.send(responseData.getResponse());
        })
    } 
};