const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const massive = require('massive');
const pg = require('pg');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const NetflixRoulette = require('netflix-roulette');
const config = require('./config.js');
const cors = require('cors');
const connectionString = "postgres://postgres:@localhost/netflix-clone";


const app = express();
module.exports = app;

var massiveInstance = massive.connectSync({connectionString : connectionString});

app.set('db', massiveInstance);

pg.connect(connectionString, function (err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::varchar AS my_first_query', ['netflix-clone'], function (err, result) {
    done();

    if (err) {
      return console.error('error happened during query', err);
    }
    console.log(result.rows[0]);
    process.exit(0);
  });
});

app.post('/users', function (req, res, next) {
  const user = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err);
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done(); //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        return next(err);
      }

      res.send(200);
    });
  });
});

app.get('/users', function (req, res, next) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err);
    }
    client.query('SELECT name, age FROM users;', [], function (err, result) {
      done();

      if (err) {
        // pass the error to the express error handler
        return next(err);
      }

      res.json(result.rows);
    });
  });
});
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.get('/', (request, response) => {
  response.render('home', {
    name: 'Lane'
  });
});
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


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


// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     db.getUserByUsername([username], function(err, user) {
//       user = user[0];
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (user.password != password) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));
//
// passport.use(new FacebookStrategy({
//   clientID: config.facebook.clientID,
//   clientSecret: config.facebook.clientSecret,
//   callbackURL: "http://localhost:3000/auth/facebook/callback",
//   profileFields: ['id', 'displayName']
// },
// function(accessToken, refreshToken, profile, cb) {
//   db.getUserByFacebookId([profile.id], function(err, user) {
//     user = user[0];
//     if (!user) {
//       console.log('CREATING USER');
//       db.createUserFacebook([profile.displayName, profile.id], function(err, user) {
//         console.log('USER CREATED', user);
//         return cb(err, user);
//       });
//     } else {
//       return cb(err, user);
//     }
//   });
// }));
//
// passport.serializeUser(function(user, done) {
//   done(null, user.userid);
// });
//
// passport.deserializeUser(function(id, done) {
//   db.getUserById([id], function(err, user) {
//     user = user[0];
//     if (err) console.log(err);
//     else console.log('RETRIEVED USER');
//     console.log(user);
//     done(null, user);
//   });
// });

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});

// app.post('/auth/local', passport.authenticate('local'), function(req, res) {
//   res.status(200).send();
// });
//
// app.get('/auth/facebook', passport.authenticate('facebook'));
//
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {successRedirect: '/' }), function(req, res) {
//     res.status(200).send(req.user);
//   });
//
// app.get('/auth/me', function(req, res) {
//   if (!req.user) return res.sendStatus(404);
//   res.status(200).send(req.user);
// });
//
// app.get('/auth/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });



const port = 3000;
app.listen(port, function(){
  console.log("It's working on ", port);
});
