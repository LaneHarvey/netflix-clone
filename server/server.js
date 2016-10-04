var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connectionString = "postgres://postgres:@localhost/netflix-clone";

var app = express();
module.exports = app;

var massiveInstance = massive.connectSync({connectionString : connectionString});

app.set('db', massiveInstance);

var db = app.get('db');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../public'));

var browseCtrl = require('./controllers/mainCtrl');



var port = 3000;
app.listen(port, function(){
  console.log("It's working on ", port);
});
