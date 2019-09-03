var express = require('express');
var router = express.Router();
var log = require('./../common/log');

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res){
  res.send('API home page');
  console.log('API home page');
  var msg = log.showDate();
  console.log('', msg);
});

module.exports = router;
