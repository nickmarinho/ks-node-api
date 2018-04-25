var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  var d = new Date();
  var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  var month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
  var year = d.getFullYear();
  var hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
  console.log('Time: ', Date.now());
  console.log('Date: ', day+'/'+month+'/'+year);
  console.log('Hour: ', hours+':'+minutes+':'+seconds);
  console.log('');
  next();
});

router.get('/', function(req, res){
  console.log('API home page');
  console.log('');
  res.send('API home page');
});

module.exports = router;
