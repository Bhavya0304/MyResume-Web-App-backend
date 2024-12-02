const User = require('../models/User');
const Response = require('../classes/Response');
const MapPaths = require('../classes/Mappaths');
const UserData = require('../models/UserData');

module.exports = { 
    post:(req,res)=>{
        var username = req.params.id;
        if(!username){
            username = "bhavya0304";
        }
        if(req.body.all){

        }
        var number = req.body.length == undefined ? 1000 : parseInt(req.body.length);
        var skip = req.body.offset == undefined ? 0 : (parseInt(req.body.offset)-1) * parseInt(req.body.length);
        User.getUserId(username).then((user)=>{
            if(!user){
                var responseData = new Response({Status:404,Error:"No user found!"});
                res.send(responseData.getResponse());
            }
            else{
                User.getUserTimeline(user._id,number,skip).then((data)=>{
                    var mp = new MapPaths(req.protocol+"://"+ req.get('host'));
                    data.map((value)=>{
                        if(value.Icon != undefined && value.Icon != ""){
                            value.Icon  =  mp.getTimelineImages(username,value.Icon);
                        }
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
                    UserData.editUserTimeline(user._id.toString(),data).then((newUser)=>{
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
                    UserData.addUserTimeline(user._id.toString(),data).then((newUser)=>{
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
                    UserData.deleteUserTimeline(user._id.toString(),data).then((newUser)=>{
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