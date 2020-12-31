global.appRoot=__dirname;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var registration = require('./routes/registration');
var login= require('./routes/login');
var verify=require('./routes/verify');

var app = express();

var passport=require('passport');
var flash= require('connect-flash');
var session = require('express-session');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// for test
//session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

//for test
//passport intit
app.use(passport.initialize());
app.use(passport.session());





//for test
// validator
// In this example, the formParam value is going to get morphed into form body format useful for printing.
/*var expressValidator= requre('express-validator')  // should install first
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));*/


//for test
//connect flash
app.use(flash());


//for test
//Gloval var
/*
app.use(function (req,res,next) {
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error=req.flash('error');
    
});
*/









app.use('/', routes);
app.use('/login', login);
app.use('/registration', registration);
app.use('/verify', verify);
app.use('/users', users);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
