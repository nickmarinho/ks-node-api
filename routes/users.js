var express = require('express');
var router = express.Router();
var log = require('./../common/log');

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  // let usersArray = sessionStorage.getItem('users') ? sessionStorage.getItem('users') : [];
  
  // sessionStorage.find({}, function(err, user) {
  //   if (err)
  //   res.send(err);
  //   res.json(user);
  // });

  let message = 'Listing all users';
  res.send(message);
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.post('/', function(req, res) {
  // var new_user = new sessionStorage(req.body);
  // new_user.save(function(err, user) {
  //   if (err)
  //   res.send(err);
  //   res.json(user);
  // });

  let message = 'Creating a user';
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

  let message = 'Reading a user by id';
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

  let message = 'Updating a user';
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

  let message = 'Deleting a user by id';
  res.send(message);
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

module.exports = router;