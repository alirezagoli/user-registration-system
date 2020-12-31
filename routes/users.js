var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

/* GET users listing. */

function isAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    else {
        /*req.flash('error_msg','You are not logged in');
         res.redirect('/login');*/
        res.render("fail_message",{message:"You are not logged in!",linkText:""});
    }

}


router.get('/',isAuthenticated,function(req, res, next) {

    if(req.user.homeAccess==false && req.user.managementAccess==false)
    {
        res.redirect('/login');
    }
    else if(req.user.homeAccess==true) {
        res.render('user_home', {
            userType: req.user.userType, managementAccess: req.user.managementAccess, email: req.user.email,
            name: req.user.firstName + " " + req.user.lastName
        });
    }
    else
    {
        res.redirect('/users/management');
    }
});

router.get('/management',isAuthenticated,function(req, res, next) {

    if(req.user.managementAccess==true)
    {
        userModel.getAllUsers(function (err,users) {
            res.render('user_management',{userType:req.user.userType,homeAccess:req.user.homeAccess,
                users:users})
        });
    }
    else
    {
        res.render("fail_message",{message:"Access Denied!",linkText:""});
    }
});

router.post('/management' /*,isAuthenticated*/,function(req, res, next) {

    //console.log(req.body.content);
    var parsedJSON = JSON.parse(req.body.content);
    for (var i=0;i<parsedJSON.length;i++) {
        userModel.update({ email: parsedJSON[i].email }, { $set: { homeAccess:parsedJSON[i].homeAccess,
        managementAccess:parsedJSON[i].managementAccess}}, function (err) {
        });
        console.log(parsedJSON[i]);
    }
    res.end();
});




module.exports = router;
