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
    var new_name = username + '_' + ran +"."+ ext;
    while(doesExists(new_name,username)){
        ran = between(11111111,99999999);
        new_name = username + '_' + ran +"."+ ext;
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
          if(urlType == "images"){
            var name = file.originalname;
            var splits = name.split('.');
            var ext = splits[splits.length-1];
            cb(null, getFilename(username,ext));
          }
          else{
            cb(null,"MyResume.pdf");
          }
            
        }
    });
}

  var multerUploads = (username,urlType)=>{

      var ret = multer({
          storage:storage(username,urlType),
          fileFilter: function (req, file, cb){
            
              
              // Set the filetypes, it is optional
              var filetypes = "";
              if(urlType == "images"){
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
                } 
            });

            if(urlType == "images"){
              return ret.array("files");
            }
            else{
              return ret.single('files');
            }
            
        } 
            
module.exports = {doesExists,getFilename,getAllFiles,multerUploads};