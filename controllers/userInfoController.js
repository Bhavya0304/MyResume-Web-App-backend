const User = require('../models/User');
const Response = require('../classes/Response');
const MapPaths = require('../classes/Mappaths');

module.exports = {
    get:(req,res)=>{
        User.getUserInfo().then((data)=>{
            var mp = new MapPaths(req.protocol+"://"+ req.get('host'));
           
                data.ProfilePic = mp.getInfoImage(data.ProfilePic);
                data.ProfileCovers.forEach((ele,index)=>{
                    data.ProfileCovers[index] = mp.getInfoImage(ele);
                
            });

            var responseData = new Response({Status:200,Data:{Data:data}});
            res.send(responseData.getResponse());
        }).catch((error)=>{
            var responseData = new Response({Status:501,Error:error});
            res.send(responseData.getResponse());
        })
    }
};