const User = require('../models/User');
const UserData = require('../models/UserData');
const Response = require('../classes/Response');
const MapPaths = require('../classes/Mappaths');

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
                User.getUserInfoTag(user._id).then((data)=>{
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
                    UserData.editUserInfoTag(user._id.toString(),data).then((newUser)=>{
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
                    UserData.addUserInfoTag(user._id.toString(),data).then((newUser)=>{
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
                    UserData.deleteUserInfoTag(user._id.toString(),data).then((newUser)=>{
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