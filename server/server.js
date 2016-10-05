var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var massive = require('massive');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var NetflixRoulette = require('netflix-roulette');
var config = require('./config.js');
var cors = require('cors');
var connectionString = "postgres://postgres:@localhost/netflix-clone";


var app = express();
module.exports = app;

var massiveInstance = massive.connectSync({connectionString : connectionString});

app.set('db', massiveInstance);


app.use(cors());
app.use(bodyParser.json());


app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboardcat'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('../public'));

var mainCtrl = require('./controllers/mainCtrl');


passport.use(new LocalStrategy(
  function(username, password, done) {
    db.getUserByUsername([username], function(err, user) {
      user = user[0];
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName']
},
function(accessToken, refreshToken, profile, cb) {
  db.getUserByFacebookId([profile.id], function(err, user) {
    user = user[0];
    if (!user) {
      console.log('CREATING USER');
      db.createUserFacebook([profile.displayName, profile.id], function(err, user) {
        console.log('USER CREATED', user);
        return cb(err, user);
      });
    } else {
      return cb(err, user);
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.userid);
});

passport.deserializeUser(function(id, done) {
  db.getUserById([id], function(err, user) {
    user = user[0];
    if (err) console.log(err);
    else console.log('RETRIEVED USER');
    console.log(user);
    done(null, user);
  });
});

app.post('/auth/local', passport.authenticate('local'), function(req, res) {
  res.status(200).send();
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {successRedirect: '/' }), function(req, res) {
    res.status(200).send(req.user);
  });

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
});

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



var port = 3000;
app.listen(port, function(){
  console.log("It's working on ", port);
});
