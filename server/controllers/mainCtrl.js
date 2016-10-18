var app = require('../server')
var moment = require('moment');
var jwt = require('jwt-simple');
var Keys = require('keys.js');
var db = app.get('db')

var imdb = require('imdb-api');


function createJWT(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, Keys.TOKEN_SECRET);
}

module.exports = {
    addUser: function(req, res) {
        var user = new User(req.body);
        user.save(function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        })
    },
    getAllUsers: function(req, res) {
        User.find({}, function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },
    updateUser: function(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
            if (err) res.status(500).json(err);
            else res.status(200).json(response);
        })
    },
    deleteUser: function(req, res) {
        var id = req.params.id;
        User.findByIdAndRemove(id, function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },

    getUser: function(req, res) {
        var id = req.params.id;
        User.findById(id, function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },
    getCurrentUser: function(req, res) {
        User.findById(req.user, function(err, user) {
            res.send(user);
        })
    },
    userLogin: function(req, res) {
        User.findOne({
            username: req.body.username
        }, 'username password', function(err, user) {
            if (!user) {
                return res.status(401).send({
                    message: 'Invalid email and/or password'
                });
            }
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (!isMatch) {
                    return res.status(401).send({
                        message: 'Invalid password'
                    });
                }
                res.send({
                    token: createJWT(user)
                });
            });
        });
    },
    userSignUp: function(req, res) {
        console.log(req.body);
        User.findOne({
            email: req.body.email
        }, function(err, existingUser) {
            if (existingUser) {
                return res.status(409).send({
                    message: 'Email is already taken'
                });
            }
            var user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            user.save(function(err, result) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                console.log(result);
                res.send({
                    token: createJWT(result)
                });
            });
        });
    },
    ensureAuthenticated: function(req, res, next) {
        if (!req.header('Authorization')) {
            return res.status(401).send({
                message: 'Please make sure your request has an Authorization header'
            });
        }
        var token = req.header('Authorization').split(' ')[1];

        var payload = null;
        try {
            payload = jwt.decode(token, Keys.TOKEN_SECRET);
        } catch (err) {
            return res.status(401).send({
                message: err.message
            });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'Token has expired'
            });
        }
        req.user = payload.sub;
        // next();
    },
    getAllMovies: function(req, res){
    db.get_all_movies(function(err, movies){
      if (err) {
        res.status(402).json(err)
      }else{
        res.status(200).json(movies)
      }
    })
  },
  createMovie: function(req, res){
    db.create_movie([req.body.unit, req.body.show_id, req.body.show_title, req.body.release_year,
      req.body.rating, req.body.category, req.body.show_cast, req.body.director, req.body.summary,
      req.body.poster, req.body.mediatype, req.body.runtime],function(err, movies){
      if (err) {
        res.status(402).json('something went wrong')
      }else{
        res.status(200).json('ok')
      }
    })
  }




}
