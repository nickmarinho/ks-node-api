var express = require('express');
var router = express.Router();
var app = express();

var home = require('./routes/home');
app.use('/', home);

var users = require('./routes/users');
app.use('/users', users);

var port = process.env.PORT || 3000;
app.listen(port);

console.log('RESTful API server started on port: ' + port);
