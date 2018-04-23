var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

module.exports = {
  create: () => express().set('json spaces', 2),
  router: require('./routes'),
  bodyParser: require('./body-parser')
}

console.log('todo list RESTful API server started on: ' + port);
