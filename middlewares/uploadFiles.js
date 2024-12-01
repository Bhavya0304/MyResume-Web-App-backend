const fileUtils = require('../classes/FileUtils');
const fileUtils3 = require('../classes/s3FileUtils');
const Response = require('../classes/Response');
const fs_extra = require('fs-extra');
const path = require('path');


module.exports = {
    uploadHandlerImg:(req,res)=>{
        var username = req.body.payload.sub;
        res.setHeader("Access-Control-Allow-Origin", "*");
                var type = "images";
                var uploads = fileUtils3.multerUploads(username,type);
                uploads(req,res,(err)=>{
                    console.log(err)
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
        
        res.setHeader("Access-Control-Allow-Origin", "*");
                var type = "Others";
                var uploads = fileUtils3.multerUploads(username,type);
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