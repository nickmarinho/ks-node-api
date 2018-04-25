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
  // sessionStorage.findById(req.params.userId, function(err, user) {
  //   if (err)
  //     res.send(err);
  //   res.json(user);
  // });

  let message = 'Reading a user by id: ' + req.params.userId;
  res.send(message);
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.put('/:userId', function(req, res) {
  // sessionStorage.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
  //   if (err)
  //     res.send(err);
  //   res.json(user);
  // });

  let message = 'Updating a user id: ' + req.params.userId;
  res.send(message);
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.delete('/:userId', function(req, res) {
  // sessionStorage.remove({
  //   _id: req.params.userId
  // }, function(err, user) {
  //   if (err)
  //     res.send(err);
  //   res.json({ message: 'user successfully deleted' });
  // });

  let message = 'Deleting a user by id: ' + req.params.userId;
  res.send(message);
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

module.exports = router;