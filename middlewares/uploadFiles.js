const fileUtils = require('../classes/FileUtils');
const Response = require('../classes/Response');
const fs_extra = require('fs-extra');
const path = require('path');


module.exports = {
    uploadHandlerImg:(req,res)=>{
        var username = req.body.payload.sub;
        res.setHeader("Access-Control-Allow-Origin", "*");
                var type = "images";
                var uploads = fileUtils.multerUploads(username,type);
                uploads(req,res,(err)=>{
                    if(err){
                        var responseData = new Response({Status:501,Error:err});
                        res.send(responseData.getResponse());
                    }
                    else{
                        var responseData = new Response({Status:200,Data:{Data:"Success"}});
                        res.send(responseData.getResponse());
                    }
                });
    },
    uploadHandlerPDF:(req,res)=>{
        var username = req.body.payload.sub;
        var file = path.join(__dirname , "../public/assets/" + username + "/Others/MyResume.pdf");
        fs_extra.remove(file);
        res.setHeader("Access-Control-Allow-Origin", "*");
                var type = "Others";
                var uploads = fileUtils.multerUploads(username,type);
                uploads(req,res,(err)=>{
                    if(err){
                        var responseData = new Response({Status:501,Error:err});
                        res.send(responseData.getResponse());
                    }
                    else{
                        var responseData = new Response({Status:200,Data:{Data:"Success"}});
                        res.send(responseData.getResponse());
                    }
                });
    }
};