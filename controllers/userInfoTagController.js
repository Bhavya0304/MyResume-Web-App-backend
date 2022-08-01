const User = require('../models/User');
const Response = require('../classes/Response');
const MapPaths = require('../classes/Mappaths');

module.exports = {
    get:(req,res)=>{
        User.getUserInfoTag().then((data)=>{
            var responseData = new Response({Status:200,Data:{Data:data}});
            res.send(responseData.getResponse());
        }).catch((error)=>{
            var responseData = new Response({Status:501,Error:error});
            res.send(responseData.getResponse());
        })
    }
};