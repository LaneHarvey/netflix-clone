// var path = require('path');
// var pgsql = require('../controllers/pgsql');
// var crypto = require('crypto');
// var shasum = crypto.createHash('sha1');
// var md5sum = crypto.createHash('md5');
// var jwt = require('jsonwebtoken');
// var q = require('q');
//
//
// var Users = {};
// Users.password = '';
//
//
// Users.login = function(email, password, defer){
//
//   var sql = "Select * FROM Users where email = '" + email + "' LIMIT 1;";
//   Users.password = password;
//
//   var client = pgsql.conn();
//
//   client.connect(function(err){
//
//      if(err) { throw err}
//
//     client.query(sql, function(err, result){
//       if(err) { throw err}
//
//
//       oneUser = result;
//
//     if(oneUser.rowCount){
//
//       oneUser = oneUser.rows;
//
//       sql = "Select * From Meta where userid = '" + oneUser[0].id + "' LIMIT 1;";
//
//       client.query(sql, function(err, result){
//         if(err) throw err;
//
//        if(result.rowCount){
//
//         var one = result.rows[0].saltone;
//         var two = result.rows[0].salttwo;
//         var password = crypto.createHash('sha1').update(crypto.createHash('md5').update(one + two + Users.password).digest('hex')).digest('hex');
//
//
//         //Do Hashed Passwords Match
//         if(password == result.rows[0].password){
//
//         //Rebuild A user Object to send back to the client;
//         var pass = {};
//         pass.id = oneUser[0].id;
//         pass.token = Users.generateToken(oneUser[0].id, oneUser[0].created + crypto.randomBytes(16).toString('hex'));
//         pass.fullname = oneUser[0].fullname;
//         pass.email = oneUser[0].email;
//         defer.resolve(pass);
//
//         //update users with new logintoken;
//
//         }else{
//
//         var fail = {};
//         fail.id = 0;
//         fail.reason = 'Username/Password Invalid';
//         defer.reject(fail);
//
//         }
//
//
//        }else{
//
//         var fail = {};
//         fail.id = 0;
//         fail.reason = 'Username/Password Invalid';
//         defer.reject(fail);
//
//        }
//
//      });
//
//
//     }else{
//
//       var fail = {};
//       fail.id = 0;
//       fail.reason = 'Username/Password Invalid';
//       defer.reject(fail);
//     }
//   });
//
//
//
//     });
//
//
// return defer.promise;
//
//
//
// };
//
//
//
//
// Users.generateToken = function(payload, secret){
//
// 	return jwt.sign({user: payload},secret);
//
// };
//
// Users.addNewUser = function(aUser, defer){
//
// 	var created = new Date();
// 	var password = aUser.pword;
//   var sqlCheckEmail = "Select * FROM Users where email = '" + aUser.uEmail + "' LIMIT 1;";
// 	var sqlInsertUser = 'INSERT INTO users (active, created, updated, roleid, email, fullname) VALUES ($1,$2,$3,$4,$5,$6) RETURNING ID';
//   var sqlInsertUserData = [1, created, created, 0, aUser.uEmail, aUser.fullname];
// 	var crudUser = {};
//
//   var client = pgsql.conn();
//
//   client.connect(function(err){
//
//     if(err) {defer.reject(err)}
//
//     client.query(sqlCheckEmail, function(err, result){
//
//     if(result.rowCount !== 0){
//       var fail = {};
//         fail.id = 0;
//         fail.reason = 'Email Exists. Please Try Another Email';
//         defer.reject(fail);
//         client.end();
//     }
//
//     client.query(sqlInsertUser, sqlInsertUserData, function(err, result){
//       if(err) {defer.reject(err)}
//
//       if(result.rows[0].id){
//         crudUser.id = result.rows[0].id;
//         crudUser.token = Users.generateToken(crudUser.id, created + crypto.randomBytes(16).toString('hex'));
//         crudUser.fullname = aUser.fullname;
//         crudUser.email = aUser.uEmail;
//         crudUser.bizname = aUser.bizname;
//         //Build Stored Password with two random salts;
//         var one = crypto.createHash('sha1').update(crypto.randomBytes(16).toString('hex')).digest('hex');
//         var two = crypto.createHash('sha1').update(crypto.randomBytes(16).toString('hex')).digest('hex');
//         password = crypto.createHash('sha1').update(crypto.createHash('md5').update(one + two + password).digest('hex')).digest('hex');
//         created = new Date();
//
//         var sqlInsertCredential = 'INSERT INTO Meta (userid, created, updated, lastlogin, password, saltone, salttwo) VALUES ($1, $2, $3, $4, $5, $6, $7)';
//         var sqlInsertCredentialData = [crudUser.id, created, created, created, password, one, two];
//
//         client.query(sqlInsertCredential, sqlInsertCredentialData, function(err, result){
//           if(err) {defer.reject(err);}
//
//             client.end();
//             defer.resolve(crudUser);
//
//         });
//
//
//       }
//
//     });
//
//   });
//
//   });
//
//
//   return defer.promise;
//
// };
//
// Users.addTableData = function(tbdata, defer){
//
//   var knex = pgsql.knex();
//
//   knex('tbdata').insert(tbdata, 'id').then(function(data){
//     defer.resolve(data);
//   }, function(err){
//     defer.reject(err);
//   });
//
//   return defer.promise;
// }
//
// Users.updateTableData = function(tbdata, defer){
//
//   var knex = pgsql.knex();
//   var id = tbdata.id;
//   delete tbdata.id;
//   assessment.updated = new Date();
//   knex('tbdata').where({id:id}).update(tbdata).returning('id').then(function(data){
//     defer.resolve(data);
//   }, function(err){
//     defer.reject(err);
//   });
//
//   return defer.promise;
// }
//
// Users.getTableData = function(tbdata, defer){
//
//   var knex = pgsql.knex();
//   knex('tbdata').where({id:tbdata}).select().then(function(data){
//     defer.resolve(data);
//   }, function(err){
//     defer.reject(err);
//   });
//
//   return defer.promise;
// }
//
// module.exports = Users;
