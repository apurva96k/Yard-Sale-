var express=require('express');
var catalog=require('./controller/catalog.js');
var profile=require('./controller/profile.js');
var signup=require('./controller/signup.js');
var login=require('./controller/login.js');
var newConnection=require('./controller/newConnection.js');
var app=express();
var bodyParser= require('body-parser');
var session = require('express-session');
app.use(session({secret:'secret'}));
var passwordHashDB = require('./utility/passwordHash.js');
app.set('view engine','ejs');


app.use('/assets',express.static('assets'));

app.use('/utility',express.static('utility'));

app.use('/connections',catalog);

app.use('/profile',profile);

app.use('/signup',signup);
app.use('/signin',login);
app.use('/signout',login);
app.use('/newConnection',newConnection);

app.get('/contact',function(request,response)
{
  if(request.session.theUser){
  response.render('contact',{currentUser:'yes',currentName:request.session.theUser.firstName})
  }
  else{
      response.render('contact',{currentUser:'no',currentName:'Please Sign in!'})
  }

});
app.get('/about',function(request,response)
{
  if(request.session.theUser){
  response.render('about',{currentUser:'yes',currentName:request.session.theUser.firstName})
  }
  else{
      response.render('about',{currentUser:'no',currentName:'Please Sign in!'})
  }
});

app.get('/',function(request,response)
{
  if(request.session.theUser){
  response.render('index',{currentUser:'yes',currentName:request.session.theUser.firstName})
  }
  else{
      response.render('index',{currentUser:'no',currentName:'Please Sign in!'})
  }
});
app.get('/*',function(request,response)
{
  if(request.session.theUser){
  response.render('index',{currentUser:'yes',currentName:request.session.theUser.firstName})
  }
  else{
      response.render('index',{currentUser:'no',currentName:'Please Sign in!'})
  }
});

app.listen('8080');
