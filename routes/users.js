var express = require('express');
var router = express.Router();
var log = require('./../common/log');
var fs = require('fs');
var bcrypt = require('bcryptjs');
var usersDbFile = 'db/users.json';

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  res.send(usersData);

  let message = 'Listing all users';
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.get('/:userId', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  var userId = req.params.userId;
  var userData = getUserById(usersData, userId);
  res.send(userData);

  let message = 'Reading a user by id: ' + userId;
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.post('/', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  req.body.password = bcrypt.hashSync(req.body.password);
  usersData.push(req.body);
  fs.writeFileSync(usersDbFile, JSON.stringify(usersData) , 'utf-8');

  let message = 'Creating a user: ' + JSON.stringify(req.body);
  res.send(message);
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.put('/:userId', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  var userId = req.params.userId;

  for (var d = 1, len = usersData.length; d < len; d += 1) {
    if (userId.indexOf(usersData[d].id) !== -1) {
      usersData.splice(d, 1);
      req.body.password = bcrypt.hashSync(req.body.password);
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

router.post('/authenticate', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];

  for (var d = 0, len = usersData.length; d < len; d += 1) {
    if (toString(usersData[d].email) === toString(req.body.email)) {
      if(bcrypt.compareSync(req.body.password, usersData[d].password)) {
        res.status(200).send({ auth: true });
        var msg = log.showDate();
        console.log('', msg);
      } else {
        res.status(401).send('Failed to authenticate: ' + toString(usersData[d].email));
        var msg = log.showDate();
        console.log('', msg);
      } 
    } else {
      res.status(404).send('No user found: ' + toString(usersData[d].email));
      var msg = log.showDate();
      console.log('', msg);
    }  
  }
});

router.delete('/:userId', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  var userId = req.params.userId;

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
