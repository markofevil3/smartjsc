'use strict';

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(express);

// mongoose.connect('mongodb://54.251.45.255/smartjsc');
mongoose.connect('mongodb://localhost/smartjsc');

app.configure(function() {
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({ uploadDir: __dirname + '/public/temp' }));
  // app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());  
  app.use(express.session({
    secret: '076ee61d63aa10a125ea872411e433b9',
    cookie: {maxAge: 3600000},
    store: new MongoStore({db: 'smartjsc', clear_interval: 1})
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

function check_auth(req, res, next) {
  //  if the user isn't logged in, redirect them to a login page
  if(!req.session.authenticated) {
    res.redirect("/login");
    return;
  }
  next();
}

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//client
app.get('/', routes.index);
app.get('/news', routes.news);
app.get('/questions', routes.questions);
app.get('/studying', routes.studying);

app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/user', check_auth, routes.userPanel);
app.get('/admin', check_auth, routes.adminPanel);
app.get('/showFiles', check_auth, routes.showFiles);
app.get('/download', check_auth, routes.download);
app.get('/createAccount', check_auth, routes.createAccount);
app.get('/changePassword', check_auth, routes.changePassword);
app.get('/addArticle', check_auth, routes.addArticle);
app.get('/addGallery', check_auth, routes.addGallery);

app.post('/login', routes.authenticate);
app.post('/uploadLecture', check_auth, routes.uploadLecture);
app.post('/createAccount', check_auth, routes.createAccount);
app.post('/changePassword', check_auth, routes.changePassword);
app.post('/addArticle', check_auth, routes.addArticle);
app.post('/addGallery', check_auth, routes.addGallery);
//server
app.get('/text', routes.text);
app.get('/campingImages', routes.campingImages);
app.post('/add', routes.add);
app.post('/upload', routes.upload);
app.post('/contact', routes.contact);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});