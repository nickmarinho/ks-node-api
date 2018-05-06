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

router.get('/:page', function(req, res) {
  var users = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];

  var totalUsers = users.length,
      pageSize = 10,
      pageCount = totalUsers/pageSize,
      currentPage = req.params.page ? Number(req.params.page) : 1,
      usersArrays = [], 
      usersList = [];

  //split list into groups
  while (users.length > 0) {
    usersArrays.push(users.splice(0, pageSize));
  }

  //show list of users from group
  usersList = usersArrays[Number(currentPage) - 1];

  res.send(usersList);

  let message = 'Listing page: ' + currentPage + ' of users';
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.get('/:userId', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  var userId = req.params.userId;

  for (var d = 0, len = usersData.length; d < len; d += 1) {
    if (Number(usersData[d].id) === Number(userId)) {
      res.send(usersData[d]);

      let message = 'Reading a user by id: ' + userId;
      console.log(message);
      var msg = log.showDate();
      console.log('', msg);
    }
  }  
});

router.post('/', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  req.body.password = bcrypt.hashSync(req.body.password);
  req.body.id = Number(usersData.length) + 1;
  usersData.push(req.body);
  fs.writeFileSync(usersDbFile, JSON.stringify(usersData) , 'utf-8');

  let message = 'Creating a user: ' + JSON.stringify(req.body);
  res.status(200).send({ success: true, message: message });
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.put('/:userId', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  var userId = req.params.userId;

  for (var d = 0, len = usersData.length; d < len; d += 1) {
    if (userId.indexOf(usersData[d].id) !== -1) {
      usersData.splice(d, 1);
      req.body.password = bcrypt.hashSync(req.body.password);
      usersData.push(req.body);
      fs.writeFileSync(usersDbFile, JSON.stringify(usersData) , 'utf-8');
    }
  }

  let message = 'Updating a user id: ' + userId;
  res.status(200).send({ success: true, message: message });
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.post('/authenticate', function(req, res, next) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  var userFound = 0;

  for (var d = 0, len = usersData.length; d < len; d += 1) {
    if (req.body.email.indexOf(usersData[d].email) !== -1) {
      if(bcrypt.compareSync(req.body.password, usersData[d].password)) {
        res.status(200).send({ auth: true, email: usersData[d].email, role: usersData[d].role });
        console.log('User logged: ' + JSON.stringify(usersData[d].email));
        var msg = log.showDate();
        console.log('', msg);
        userFound++;
        return;
      } else {
        var errMsg = 'Failed to authenticate: ' + req.body.email;
        res.status(401).send(errMsg);
        console.log(errMsg);
        var msg = log.showDate();
        console.log('', msg);
        return;
      } 
    }
  }
  
  if (!userFound) {
    res.status(404).send('No user found: ' + toString(usersData[d].email));
    var msg = log.showDate();
    console.log('', msg);
    return;
  }  
});

router.delete('/:userId', function(req, res) {
  var usersData = fs.readFileSync(usersDbFile, 'utf8') ? JSON.parse(fs.readFileSync(usersDbFile, 'utf8')) : [];
  var userId = req.params.userId;

  for (var d = 0, len = usersData.length; d < len; d += 1) {
    if (userId.indexOf(usersData[d].id) !== -1) {
      usersData.splice(d, 1);
      fs.writeFileSync(usersDbFile, JSON.stringify(usersData) , 'utf-8');
    }
  }

  let message = 'Deleting a user by id: ' + userId;
  res.status(200).send({ success: true, message: message });
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

module.exports = router;
