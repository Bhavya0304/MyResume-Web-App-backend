const fs = require('fs')
const path = require('path');
const multer = require('multer');


function doesExists(name,username){
    const file = path.join( __dirname, '../public/assets/'+username+'/images/'+name);
    try {
      if (fs.existsSync(file)) {
        return true;
      }
      else{
        return false;
      }
    } catch(err) {
      return false;
    }
}

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

function getFilename(username,ext){
    var ran = between(11111111,99999999);
    var new_name = username + '_' + ran + ".jpg";
    while(doesExists(new_name,username)){
        ran = between(11111111,99999999);
        new_name = username + '_' + ran + ".jpg";
    }
    return new_name;
}

function getAllFiles(username){
    const folder = path.join( __dirname, '../public/assets/'+username+'/images/');
    files = [];
    fs.readdirSync(folder).forEach(file => {
        files.push(file);
    });
    return files;
}

var storage = (username,urlType)=>{

    return multer.diskStorage({
        destination: function (req, file, cb) {
            // Uploads is the Upload_folder_name
            cb(null, "public/assets/"+username+"/" + urlType + "/");
        },
        filename: function (req, file, cb) {
            cb(null, getFilename(username));
        }
    });
}

  var multerUploads = (username,urlType)=>{

      return multer({
          storage:storage(username,urlType),
          fileFilter: function (req, file, cb){
            
              
              // Set the filetypes, it is optional
              var filetypes = /jpeg|jpg|png/;
              var mimetype = filetypes.test(file.mimetype);
              
              var extname = filetypes.test(path.extname(
                  file.originalname).toLowerCase());
                  
                  if (mimetype && extname) {
                      return cb(null, true);
                    }
                    
                    cb("Error: File upload only supports the "
                    + "following filetypes - " + filetypes);
                } 
            }).array("files");
            
        } 
            
module.exports = {doesExists,getFilename,getAllFiles,multerUploads};