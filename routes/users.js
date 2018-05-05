var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var log = require('./../common/log');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var usersDataSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  homePhone: String,
  cellPhone: String,
  password: String
}, {
	collection: 'usersData'
});

var usersData = mongoose.model('usersData', usersDataSchema);

mongoose.connect('mongodb://localhost:27017/ks-node-api');

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  usersData.find({}, function(err, result) {
		if (err) throw err;
		if (result) {
			res.json(result);
		} else {
			res.send(JSON.stringify({
				error : 'Error'
			}));
		}
	});

  let message = 'Listing all users';
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

router.get('/:userId', function(req, res) {
  var userId = req.params.userId;

  usersData.find({ id: userId }, function(err, result) {
		if (err) throw err;
		if (result) {
			res.json(result);
      let message = 'Reading a user by id: ' + userId;
      console.log(message);
      var msg = log.showDate();
      console.log('', msg);
    } else {
			res.send(JSON.stringify({
				error : 'Error'
			}));
		}
	});
});

router.post('/', function(req, res) {
  req.body.password = bcrypt.hashSync(req.body.password);
  req.body.id = Number(usersData.length) + 1;
  var userDataConnect = new usersData(req.body);
  userDataConnect.save().then(item => {
    let message = 'Creating a user: ' + JSON.stringify(req.body);
    res.status(200).send({ success: true, message: message });
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  })
  .catch(err => {
    res.status(400).send("Unable to save user to the database");
  });
});

router.put('/:userId', function(req, res) {
  var userId = req.params.userId;
  
  var newValues = {
    $set: {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      homePhone: req.body.homePhone,
      cellPhone: req.body.cellPhone
    }
  };

  usersData.updateOne({ "id": userId }, newValues, function(err, result){
    if(err) throw err;
    let message = 'Updating a user id: ' + userId;
    res.status(200).send({ success: true, message: message });
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  });
});

router.post('/authenticate', function(req, res) {
  usersData.find({ email: req.body.email }, function(err, result) {
		if (err) throw err;
		if (result) {
      if(bcrypt.compareSync(req.body.password, result.password)) {
        res.status(200).send({ auth: true });
        var msg = log.showDate();
        console.log('', msg);
      } else {
        res.status(401).send('Failed to authenticate.');
        var msg = log.showDate();
        console.log('', msg);
      } 
    } else {
      res.status(404).send('No user found.');
      var msg = log.showDate();
      console.log('', msg);
		}
	});
});

router.delete('/:userId', function(req, res) {
  var userId = req.params.userId;

  usersData.deleteOne({ "id": userId }, function(err, result) {
    if(err) throw err;    
    let message = 'Deleting a user by id: ' + userId;
    res.status(200).send({ success: true, message: message });
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  });
});

module.exports = router;