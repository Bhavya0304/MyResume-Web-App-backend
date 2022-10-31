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
        // var username = req.body.payload.sub;
        // var files = req.body.files;
        // if(files.length > 0){
        //     files = files.map((file)=>{
        //         return file.content.replace(/^data:.*,/, '');
        //     });
        //     files.forEach((ele)=>{
        //         try{
        //             var name = fileUtils.getFilename(username);
        //             var mp = new MapPaths(req.protocol+"://"+ req.get('host'));
        //             fs.writeFile(mp.getImage(username,name),ele,'base64');
        //         }catch(err){
        //             var responseData = new Response({Status:501,Error:err});
        //             res.send(responseData.getResponse());
        //         }
        //         var responseData = new Response({Status:200,Data:{Data:"Success"}});
        //         res.send(responseData.getResponse());
        //     });
        // }
        // else{
        //     var responseData = new Response({Status:404,Error:"No Image found!"});
        //     res.send(responseData.getResponse());
        // }
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