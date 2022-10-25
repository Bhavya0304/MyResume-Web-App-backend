const User = require('../models/User');
const Response = require('../classes/Response');
const Utils = require('../classes/Utils');

module.exports = {
    get:(req,res)=>{
        var responseData = new Response({Status:200,Data:true});
        res.send(responseData.getResponse());
    }
}