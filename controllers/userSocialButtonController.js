const User = require('../models/User');
const Response = require('../classes/Response');
const MapPaths = require('../classes/Mappaths');
const UserData = require('../models/UserData');

module.exports = {
    get:(req,res)=>{
        var username = req.params.id;
        if(!username){
            if(req.body.payload){
                username = req.body.payload.sub;
            }
            else{
                username = "bhavya0304";
            }
        }
        User.getUserId(username).then((user)=>{
            if(!user){
                var responseData = new Response({Status:404,Error:"No user found!"});
                res.send(responseData.getResponse());
            }
            else{
                User.getUserSocialButton(user._id).then((data)=>{
                    var mp = new MapPaths(req.protocol+"://"+ req.get('host'));
                    data.map((value)=>{
                        if(value.Social_Media_Name == "MyResume"){
                            value.Link = mp.getOthers(username,value.Link);
                        }
                        value.Image = mp.getSocialButtonsImages(username,value.Image);
                        return value;  
                    });
                    var responseData = new Response({Status:200,Data:{Data:data}});
                    res.send(responseData.getResponse());
                }).catch((error)=>{
                    var responseData = new Response({Status:501,Error:error});
                    res.send(responseData.getResponse());
                })
            }
        }).catch((error)=>{
            var responseData = new Response({Status:501,Error:error});
            res.send(responseData.getResponse());
        });
      
    },
    editPost:(req,res)=>{
        var data = req.body.data;
        if(!data){
            var responseData = new Response({Status:404,Error:"No data found!"});
            res.send(responseData.getResponse());
        }
        else{
            var username = req.body.payload.sub;
            User.getUserId(username).then((user)=>{
                if(!user){
                    var responseData = new Response({Status:404,Error:"No data found!"});
                    res.send(responseData.getResponse());
                }
                else{
                    UserData.editUserSocialIcons(user._id.toString(),data).then((newUser)=>{
                        if(newUser){
                            var responseData = new Response({Status:200,Data:newUser});
                            res.send(responseData.getResponse());
                        }
                        else{
                            var responseData = new Response({Status:501,Error:"Some Error!"});
                            res.send(responseData.getResponse());
                        }
                    }).catch((error)=>{
                        var responseData = new Response({Status:501,Error:"Some Error!"});
                        res.send(responseData.getResponse());
                    });
                }
            }).catch((error)=>{
                var responseData = new Response({Status:501,Error:"Some Error!"});
                res.send(responseData.getResponse());
            });
        }
    },
    addPost:(req,res)=>{
        var data = req.body.data;
        if(!data){
            var responseData = new Response({Status:404,Error:"No data found!"});
            res.send(responseData.getResponse());
        }
        else{
            var username = req.body.payload.sub;
            User.getUserId(username).then((user)=>{
                if(!user){
                    var responseData = new Response({Status:404,Error:"No data found!"});
                    res.send(responseData.getResponse());
                }
                else{
                    UserData.addUserSocialIcons(user._id.toString(),data).then((newUser)=>{
                        if(newUser){
                            var responseData = new Response({Status:200,Data:newUser});
                            res.send(responseData.getResponse());
                        }
                        else{
                            var responseData = new Response({Status:501,Error:"Some Error!"});
                            res.send(responseData.getResponse());
                        }
                    }).catch((error)=>{
                        var responseData = new Response({Status:501,Error:"Some Error!"});
                        res.send(responseData.getResponse());
                    });
                }
            }).catch((error)=>{
                var responseData = new Response({Status:501,Error:"Some Error!"});
                res.send(responseData.getResponse());
            });
        }
    },
    delete:(req,res)=>{
        var data = req.body.data;
        if(!data){
            var responseData = new Response({Status:404,Error:"No data found!"});
            res.send(responseData.getResponse());
        }
        else{
            var username = req.body.payload.sub;
            User.getUserId(username).then((user)=>{
                if(!user){
                    var responseData = new Response({Status:404,Error:"No data found!"});
                    res.send(responseData.getResponse());
                }
                else{
                    UserData.deleteUserSocialIcons(user._id.toString(),data).then((newUser)=>{
                        if(newUser){
                            var responseData = new Response({Status:200,Data:"Success!"});
                            res.send(responseData.getResponse());
                        }
                        else{
                            var responseData = new Response({Status:501,Error:"Some Error!"});
                            res.send(responseData.getResponse());
                        }
                    }).catch((error)=>{
                        var responseData = new Response({Status:501,Error:"Some Error!"});
                        res.send(responseData.getResponse());
                    });
                }
            }).catch((error)=>{
                var responseData = new Response({Status:501,Error:"Some Error!"});
                res.send(responseData.getResponse());
            });
        }
    }
};  