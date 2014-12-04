/*
In order to do express routing we try something a little different here.  
This file/module is exported entirely to provide routing and route handling
throughout the app for signup, login, editing, and deletion (CRUD).  
*/

var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
  
  //notice that this requires the use of users_controller
  //this app is a hybrid of Angular and Express
  var users = require('./controllers/users_controller');
  app.use('/static', express.static( './static')).
      use('/lib', express.static( './lib')
  );
  app.get('/', function(req, res){
    if (req.session.user) {
      res.render('index', {username: req.session.username,
                           msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/user', function(req, res){
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/signup', function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
  });
  app.get('/login',  function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
  });
  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
  app.post('/signup', users.signup);
  app.post('/user/update', users.updateUser);
  app.post('/user/delete', users.deleteUser);
  app.post('/login', users.login);
  app.get('/user/profile', users.getUserProfile);
}