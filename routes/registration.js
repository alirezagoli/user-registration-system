/**
 * Created by Alireza on 10/19/2016.
 */
var express = require('express');
var router = express.Router();
var userModel= require("../models/user");
var nodemailer = require("nodemailer");

// here we are configuring our SMTP Server details.
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "",
        pass: ""
    }
});
var rand,mailOptions,host,link;




/* GET users regidtration page */
router.get('/', function(req, res, next) {
    res.render('registration');
});


router.post('/', function(req, res, next) {

    userModel.getUserByUsername(req.body.email,function (err,user) {
        if(!user)
        {
            //sending verifivation mail
            rand=Math.floor((Math.random() * 100) + 54);
            host=req.get('host');
            link="http://"+req.get('host')+"/verify?id="+rand;
            mailOptions={
                to : req.body.email,
                subject : "Please confirm your Email account",
                html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
            }
            console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                    //res.end("error");
                }else{
                    console.log("Message sent: " + response.message);
                    //res.end("sent");
                }
            });
            var newUser = new userModel({
                firstName: req.body.firsname,
                lastName: req.body.lastname,
                email:req.body.email,
                password:req.body.password,
                userType:"Normal",
                homeAccess:true,
                managementAccess:false,
                verificationKey:rand,
                Activate:false
            });
            userModel.createUser(newUser,function (err,addedUser) {
                if(err){
                    throw err;
                }

            });
            res.render('success_message',{message:"You registered successfully! a verification message has been sent to you'r email.",linkText:"Click here to sign in!"} );
        }
        else
        {
            res.render('fail_message',{message:"Your username is taken before!",linkText:"Click here to try again!"});
        }
    })


});

module.exports = router;
