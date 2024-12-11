const User = require('../models/User');
const UserData = require('../models/UserData');
const Response = require('../classes/Response');
const Utils = require('../classes/Utils');
const sendEmail = require('../classes/emailservice');

module.exports = {
    post:(req,res)=>{
        var username = req.body.username;
        var password = req.body.password;
        User.getUserId(username).then((user)=>{
            if(!user){
                var responseData = new Response({Status:404,Error:"User not found!"});
                res.send(responseData.getResponse());
            }
            else{
                var verify = Utils.validPassword(password,user.password,user.salt);
                if(verify){
                    
                    var jwt = Utils.issueJWT(user);
                    var responseData = new Response({Status:200,Data:jwt});
                    res.send(responseData.getResponse());
                }
                else{
                    var responseData = new Response({Status:404,Error:"User not found!"});
                    res.send(responseData.getResponse());
                }
            }
        }).catch((error)=>{
            var responseData = new Response({Status:501,Error:error});
            res.send(responseData.getResponse());
        });
    },
    get:(req,res)=>{
        var responseData = new Response({Status:200,Data:"Verified"});
        res.send(responseData.getResponse());
    },
    register:async (req,res)=>{
        var userdata = req.body.data;
        var status = await User.ExistingUser(userdata.username,userdata.email);
        if(status){
            var responseData = new Response({Status:301,Error:"Username or Email already Exists"});
            res.send(responseData.getResponse());
            return;
        }

        var hash = Utils.genPassword(userdata.password);
        userdata.password = hash.hash;
        userdata.salt = hash.salt;
        delete userdata['confirmPassword'];
        //validation for username, email exsists
        UserData.addUser(userdata).then((data)=>{
            var TOTP = Utils.GenerateTOTP(userdata.username);
            var siteapiurl = process.env.SITE_URL + `/sudouser/activateuser?userid=${data._id}&email=${userdata.email}&username=${userdata.username}&otp=${TOTP}`;
            //send email with link to activate user
            var body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content p {
            margin: 0 0 10px;
            line-height: 1.6;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #45a049;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>New User Registration Request</h1>
        </div>
        <div class="content">
            <p>Hello Admin,</p>
            <p>A new user has registered and is awaiting your approval. Please review their details and activate their account using the link below.</p>
            <p><strong>User Details:</strong></p>
            <p><strong>Username:</strong> ${userdata.username}</p>
            <p><strong>Email:</strong> ${userdata.email}</p>
        </div>
        <div class="button-container">
            <a href="${siteapiurl}" class="button">Activate User</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
            var emailout = sendEmail("jshi.bhavya@gmail.com","User Registration Request!",body);
            var responseData = new Response({Status:200,Data:{Data:data}});
            res.send(responseData.getResponse());
        }).catch((error)=>{
            var responseData = new Response({Status:501,Error:error});
            res.send(responseData.getResponse());
        })
       

    },
    activateUser:(req,res)=>{
        var username = req.query.username;
        var userid = req.query.userid;
        var totp = req.query.otp;
        var email = req.query.email;
        var body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content p {
            margin: 0 0 10px;
            line-height: 1.6;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #45a049;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Your Account is Now Active</h1>
        </div>
        <div class="content">
            <p>Hello ${username},</p>
            <p>Congratulations! Your account has been successfully activated.</p>
            <p>To access your public profile page and unlock all features, you need to complete your profile by logging into your account and saving your profile changes for the first time.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
                <li>Log in to your account using your registered email and password.</li>
                <li>Navigate to the "Edit Profile" section.</li>
                <li>Fill out the required details and click "Save Changes."</li>
            </ul>
        </div>
        
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            <p>If you have any questions, feel free to contact our support team.</p>
        </div>
    </div>
</body>
</html>
`;
        if(totp == Utils.GenerateTOTP(username)){
            UserData.ActivateUser(userid).then((data)=>{
                var emailout = sendEmail(email,"User Registration Approved!",body);
                var responseData = new Response({Status:200,Data:{Data:data}});
                res.send(responseData.getResponse());

            }).catch((error)=>{
                var responseData = new Response({Status:501,Error:error});
                res.send(responseData.getResponse());
            })
        }
        else{
            var responseData = new Response({Status:401,Error:"Invalid Otp"});
            res.send(responseData.getResponse()); 
        }
        
    }
    
}