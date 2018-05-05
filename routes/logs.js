var express = require('express');
var router = express.Router();
var log = require('./../common/log');
var fs = require('fs');
var logsDbFile = 'db/logs.json';

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  var logsData = fs.readFileSync(logsDbFile, 'utf8') ? JSON.parse(fs.readFileSync(logsDbFile, 'utf8')) : [];
  res.send(logsData);

  let message = 'Listing all logs';
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.post('/', function(req, res) {
  var logsData = fs.readFileSync(logsDbFile, 'utf8') ? JSON.parse(fs.readFileSync(logsDbFile, 'utf8')) : [];
  logsData.push(req.body);
  fs.writeFileSync(logsDbFile, JSON.stringify(logsData) , 'utf-8');

  let message = 'Creating a log: ' + JSON.stringify(req.body);
  res.status(200).send({ success: true, message: message });
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

module.exports = router;
