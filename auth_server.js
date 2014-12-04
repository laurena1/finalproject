var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//this is new, we'll use it to store authentication as a session variable
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');

//ensure that the User model is registered with Mongoose/MongoDB
require('./models/users_model.js');

//a C9-oriented connection string
//make sure MongoDB is running first
var connString = "mongodb://" + "127.0.0.1" + ":27017/";

//debug code
console.log(connString + 'myapp');

//connect to Mongoose
var conn = mongoose.connect(connString + 'myapp');

//initialize Express
var app = express();

//for EJS templating
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge: 60*60*1000},
  store: new mongoStore({
      db: mongoose.connection.db,
      collection: 'sessions'
    })
  }));
  
//this is a call to an exported routine (using the Backbone.js system) 
//this becomes like another library, but we haven't sent it to npmjs
require('./routes')(app);
//app.listen(80);
//don't forget, we need to use the C9 variables
app.listen(80);