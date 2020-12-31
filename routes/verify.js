/**
 * Created by Alireza on 10/22/2016.
 */
var express = require('express');
var router = express.Router();
var userModel= require('../models/user');



/* GET home page. */

router.get('/', function(req, res, next) {
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+"127.0.0.1:3000"))
    {
        console.log("Domain is matched. Information is from Authentic email");
        userModel.find({ verificationKey:req.query.id },function (err,user) {
            if(user)
            {
                userModel.update({verificationKey:req.query.id},{ $set:{Activate:true}},function (err) {
                    
                });
                res.render('success_message',{message:"Email has been Successfully verified",linkText:""} );
            }
            else
            {
                console.log("email is not verified");
                res.render("fail_message",{message:"Bad request!",linkText:""});
            }
        })
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});



module.exports = router;