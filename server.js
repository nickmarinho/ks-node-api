var express = require('express');
var router = express.Router();
var app = express();

var bodyParser = require('./common/body-parser');
app.use(bodyParser);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }

  next();
});

var home = require('./routes/home');
app.use('/', home);

var users = require('./routes/users');
app.use('/users', users);

var port = process.env.PORT || 3000;
app.listen(port);

console.log('RESTful API server started on port: ' + port + '\n');
