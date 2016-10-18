var path = require('path');
var users = require('../controllers/users');
var rd = require('../controllers/redisesh');
var q = require('q');
var RedisSessions = require('redis-sessions');
var rs = new RedisSessions();


module.exports = function(router){

router.route('/login')

.post(function(req, res){

	//Expecting an Email and Password in the Request Post
	var email = req.body.user.email;
	var pword = req.body.user.pword;

	var defer = q.defer();
	users.login(email, pword, defer).then(function(newUser){

    //You can store session expiry on the stored session object or even ip addresses
	rd.store('user:' + newUser.token, JSON.stringify(newUser));


	//Send the Authenticated User Back as a JSON object
	res.json({user: newUser});


	}, function(err){

		res.json({user: err});

	});

});

router.route('/logout')

.post(function(req, res){

	res.json({user: 0});
	//Remove User from Redis;


});


};
