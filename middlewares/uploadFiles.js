const fileUtils = require('../classes/FileUtils');
const Response = require('../classes/Response');


module.exports = {
    uploadHandlerImg:(req,res)=>{
        // console.log(req.files);
        // console.log(req.body);
        var username = req.body.payload.sub;
        // var files = req.body.files;
        // if(files){
        //     files.forEach(element => {
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
            // });
        // }
        // else{
        //     var responseData = new Response({Status:404,Error:"No file found"});
        //     res.send(responseData.getResponse());
        // }
    }
};