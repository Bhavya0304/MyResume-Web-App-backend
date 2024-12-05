const fileUtils = require('../classes/FileUtils');
const fileUtils3 = require('../classes/s3FileUtils');
const MapPaths = require('../classes/Mappaths');
const fs = require('fs');
const fs_extra = require('fs-extra');
const path = require('path');
const Response = require('../classes/Response');


module.exports = {
    getAllFiles:(req,res)=>{
        var username = req.body.payload.sub;
        if(username){
            const listParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Prefix: process.env.MEDIA_PATH + "/" + username
              };
              
              fileUtils3.S3.listObjectsV2(listParams, function(err, data) {
                  const fileObjArr = [];
                if (err) throw err;
                if(data.Contents && data.Contents.length > 0) {
                  
                  // fileObj: S3.ObjectList
                  data.Contents.forEach((fileObj) => {
                    if(fileObj.Size > 0 && !fileObj.Key.includes("pdf")) {
                      fileObjArr.push(
                       `https://${process.env.AWS_BUCKET_NAME}${process.env.AWS_REGION === 'eu-central-1' ? '.' : '.'}s3${process.env.AWS_REGION === 'us-east-1' ? '' : '-' + process.env.AWS_REGION}.amazonaws.com/${fileObj.Key}`
                      );
                    }
                  })
                  data.Contents = fileObjArr;
                }
               
                var responseData = new Response({Status:200,Data:{Data:fileObjArr}});
                res.send(responseData.getResponse());
              });
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
       
        try{
            const deleteParam = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Delete: {
                  Objects: files.map((key) => ({Key: process.env.MEDIA_PATH+"/"+username+"/"+ key}))
                }
              };
              
              fileUtils3.S3.deleteObjects(deleteParam, function(err, data) {
                if (err) throw err;
               
                var responseData = new Response({Status:200,Data:{Data:"Success"}});
                res.send(responseData.getResponse());
              });
        }catch(err){
            var responseData = new Response({Status:501,Error:err});
            res.send(responseData.getResponse());
        }
            
    }
}