// "use strict";

const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
var massive = require('massive');
// const pg = require('pg');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const NetflixRoulette = require('netflix-roulette');
const config = require('./config.js');
const cors = require('cors');
// const webkit = require('webkit');
// const nwebkit = require('node-webkit');

const connectionString = "postgres://postgres:@localhost/Netflix";
var Keys = require('keys.js');
var moment = require('moment');
moment().format();



const app = module.exports = express();




var db = massive.connectSync({connectionString : connectionString});

app.set('db', db);

var mainCtrl = require('./controllers/mainCtrl');




app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));



app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboardcat'
}));





app.get('/api/movies', mainCtrl.getAllMovies)
app.post('/api/movie', mainCtrl.createMovie)
app.post('/auth/login', mainCtrl.userLogin);
app.post('/auth/signup', mainCtrl.userSignUp);
app.get('/api/me', mainCtrl.ensureAuthenticated, mainCtrl.getCurrentUser);
app.put('/api/user/:id', mainCtrl.updateUser);

// var router = express.Router();

// router.use(function(req, res, next){
// 	next();
// });


// require('./routes')(router);





var port = 8080
app.listen(port, function(){
  console.log("it's over 9000!");
  console.log("KHANNN!");
  console.log("♫ Ground control to major tom ♫");
})
