var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res){
  console.log('API home page');
  res.send('API home page');
});

module.exports = router;
