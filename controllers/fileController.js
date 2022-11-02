const fileUtils = require('../classes/FileUtils');
const MapPaths = require('../classes/Mappaths');
const fs = require('fs');
const fs_extra = require('fs-extra');
const path = require('path');
const Response = require('../classes/Response');


module.exports = {
    getAllFiles:(req,res)=>{
        var username = req.body.payload.sub;
        if(username){
            var files = fileUtils.getAllFiles(username);
            files = files.map((ele)=>{
                var mp = new MapPaths(req.protocol+"://"+ req.get('host'));
                return mp.getImage(username,ele);
            });
            var responseData = new Response({Status:200,Data:{Data:files}});
            res.send(responseData.getResponse());
        }
        else{
            var responseData = new Response({Status:401,Error:"User not Authorized!"});
            res.send(responseData.getResponse());
        }
    },
    uploadFiles:(req,res)=>{
        
    },
    deleteFiles:(req,res)=>{
        var username = req.body.payload.sub;
        var files = req.body.files;
        files = files.map((name)=>{
            return path.join( __dirname, '../public/assets/'+username+'/images/'+name);
        });
        try{
            files.forEach((file)=>{
                fs_extra.remove(file);
            });
        }catch(err){
            var responseData = new Response({Status:501,Error:err});
            res.send(responseData.getResponse());
        }
            var responseData = new Response({Status:200,Data:{Data:"Success"}});
            res.send(responseData.getResponse());
    }
}