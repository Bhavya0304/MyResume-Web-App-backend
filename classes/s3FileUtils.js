const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


AWS.config.update({
    accessKeyId: process.env.S3_ACCESSKEY,
    secretAccessKey: process.env.S3_SECRET,
    signatureVersion: 'v4'
});

const S3 = new AWS.S3();
const fileFilter = (req, file, callback) => {
    const fileMime = file.mimetype;
    if(isAllowedMimetype(fileMime)) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}


function getFilename(username,ext){
    var ran = between(11111111,99999999);
    var new_name = username + '_' + ran +"."+ ext;
    while(doesExists(new_name,username)){
        ran = between(11111111,99999999);
        new_name = username + '_' + ran +"."+ ext;
    }
    return new_name;
}

const multerUploads = (username,type)=>{
    var multerfiles3 =  multer({
    fileFilter:function (req, file, cb){
              
        // Set the filetypes, it is optional
        var filetypes = "";
        if(type == "images"){
          filetypes = /jpeg|jpg|png/;
        }
        else{
          filetypes = /pdf/;
        }
        var mimetype = filetypes.test(file.mimetype);
        
        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());
            
            if (mimetype && extname) {
                return cb(null, true);
              }
              
              cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes);
          } ,
    storage: multerS3({
        s3: S3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            var fileName = "";
            if(urlType == "images"){
                var name = file.originalname;
                var splits = name.split('.');
                var ext = splits[splits.length-1];
                fileName =  getFilename(username,ext);
              }
              else{
                fileName =  "MyResume.pdf";

              }
            const s3_inner_directory = process.env.MEDIA_PATH + "/" + username;
            const finalPath = `${s3_inner_directory}/${fileName}`;

            file.newName = fileName;

            cb(null, finalPath );
        }

    })
    
});
if(type == "images"){
    return multerfiles3.array("files");
  }
  else{
    return multerfiles3.array('files');
  }
}

module.exports = {multerUploads,S3};