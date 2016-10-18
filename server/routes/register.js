var path = require('path');
var users = require('../controllers/users');
var q = require('q');
var rd = require('../controllers/redisesh');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('apiKey');


module.exports = function(router){

router.route('/register')

.post(function(req, res){

	var defer = q.defer();

	//Add New User as a Registrant
	users.addNewUser(req.body.user, defer).then(function(newUser){

	rd.store('user:' + newUser.token, JSON.stringify(newUser));

	//Send New User an email From Mandrill
	sendNewUser(newUser);

	res.json({user: newUser});

	}, function(err){

		res.json({user:err});
	});



});

}

var sendNewUser = function(newUser){
	var templatename = 'templatename';
	var templatecontent = [{"name": '',"content": ''}];
	var merge_vars = [];
	merge_vars.push({"name": 'email', "content": newUser.email});
	var message = {};
	message.subject = "Thank You for Registering";
	message.from_email = "email@domain.com";
	message.from_name = "From";
	message.to = [{"email": newUser.email, "name": newUser.fullname, "type": 'to'}, {"email": 'bcc@domain.com', "name": 'BCC Name', "type": 'bcc'}];
	message.global_merge_vars = merge_vars;
	var async = false;
	var ip_pool = 'Main Pool';

	mandrill_client.messages.sendTemplate({"template_name":templatename, "template_content":templatecontent, "message": message, "async": async, "ip_pool": ip_pool}, function(result){


	}, function(err){

	});


}
