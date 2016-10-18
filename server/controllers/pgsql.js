// var path = require('path');
// var pg = require('pg');
// var knex = require('knex')({
// 	client: 'pg',
// 	connection: "postgres://postgres:@localhost/Netflix"
// });
//
// var conn = "postgres://postgres:@localhost/Netflix";
//
//
// var pgsql = {};
//
// pgsql.conn = function(){
//
// return new pg.Client(conn);
//
// };
//
// pgsql.query = function(query){
//
// 	var client = new pg.Client(conn);
// 	client.connect(function(err){
//
// 		if(err) throw err
//
// 		client.query(query, function(err, rows){
// 			if(err) throw err
//
// 			return rows;
// 		});
//
// 	});
//
//
// };
//
// pgsql.knex = function(){
// 	return knex;
// };
//
// module.exports = pgsql;
