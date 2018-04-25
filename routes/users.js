var express = require('express');
var router = express.Router();
var log = require('./../common/log');
var fs = require('fs');
var usersDbFile = 'db/users.json';

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  var usersData = JSON.parse(fs.readFileSync(usersDbFile, 'utf8'));
  res.send(usersData);

  let message = 'Listing all users';
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.post('/', function(req, res) {
  var usersData = JSON.parse(fs.readFileSync(usersDbFile, 'utf8'));
  usersData.push(req.body);
  fs.writeFileSync(usersDbFile, JSON.stringify(usersData) , 'utf-8');

  let message = 'Creating a user: ' + JSON.stringify(req.body);
  res.send(message);
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.get('/:userId', function(req, res) {
  var userId = req.params.userId;
  var usersData = JSON.parse(fs.readFileSync(usersDbFile, 'utf8'));
  var userData = getUserById(usersData, userId);
  res.send(userData);

  let message = 'Reading a user by id: ' + userId;
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.put('/:userId', function(req, res) {
  var userId = req.params.userId;
  var usersData = JSON.parse(fs.readFileSync(usersDbFile, 'utf8'));

  for (var d = 1, len = usersData.length; d < len; d += 1) {
    if (userId.indexOf(usersData[d].id) !== -1) {
      usersData.splice(d, 1);
      usersData.push(req.body);
      fs.writeFileSync(usersDbFile, JSON.stringify(usersData) , 'utf-8');
    }
  }

  let message = 'Updating a user id: ' + userId;
  res.send(message);
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.delete('/:userId', function(req, res) {
  var userId = req.params.userId;
  var usersData = JSON.parse(fs.readFileSync(usersDbFile, 'utf8'));

  for (var d = 1, len = usersData.length; d < len; d += 1) {
    if (userId.indexOf(usersData[d].id) !== -1) {
      usersData.splice(d, 1);
      fs.writeFileSync(usersDbFile, JSON.stringify(usersData) , 'utf-8');
    }
  }

  let message = 'Deleting a user by id: ' + userId;
  res.send(message);
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

var getUserById = function(usersData, userId) {
  for (var d = 1, len = usersData.length; d < len; d += 1) {
    if (Number(usersData[d].id) === Number(userId)) {
      return usersData[d];
    }
  }
}

module.exports = router;