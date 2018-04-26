var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var log = require('./../common/log');
var Schema = mongoose.Schema;

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

router.post('/', function(req, res) {
  var userDataConnect = new usersData(req.body);
  userDataConnect.save().then(item => {
    let message = 'Creating a user: ' + JSON.stringify(req.body);
    res.send(message);
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  })
  .catch(err => {
    res.status(400).send("Unable to save user to the database");
  });
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

router.put('/:userId', function(req, res) {
  var userId = req.params.userId;
  
  var newValues = {
    $set: {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      homePhone: req.body.homePhone,
      cellPhone: req.body.cellPhone
    }
  };

  usersData.updateOne({ "id": userId }, newValues, function(err, result){
    if(err) throw err;
    let message = 'Updating a user id: ' + userId;
    res.send(message);
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  });
});

router.delete('/:userId', function(req, res) {
  var userId = req.params.userId;

  usersData.deleteOne({ "id": userId }, function(err, result) {
    if(err) throw err;    
    let message = 'Deleting a user by id: ' + userId;
    res.send(message);
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  });
});

module.exports = router;