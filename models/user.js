/**
 * Created by Alireza on 10/18/2016.
 */
var mongoose = require('mongoose');
var bcrypt= require('bcryptjs');
mongoose.connect('');

var userSchema= mongoose.Schema({
    firstName: String,
    lastName: String,
    email:String,
    password:String,
    userType:String,
    homeAccess:Boolean,
    managementAccess:Boolean,
    verificationKey:String,
    Activate:Boolean
});

var userModel = mongoose.model("user", userSchema);

userModel.createUser= function (newUser,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password=hash;
            newUser.save(callback);
            // Store hash in your password DB.
        });
    });
}

userModel.getUserByUsername= function (username, callback) {
    var query = {email:username};
    userModel.findOne(query,callback);
}

userModel.comparePassword= function (candidatePassword,hash, callback) {
    bcrypt.compare(candidatePassword, hash,callback);
}

userModel.getUserById= function (id,callback) {
    userModel.findById(id,callback);
}

userModel.getAllUsers= function (callback) {
    userModel.find({},callback);
}


module.exports = userModel;