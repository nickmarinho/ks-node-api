var express = require('express');
var router = express.Router();
var log = require('./../common/log');
var mysqlConnection = require('./../common/db-connection');
var bcrypt = require('bcryptjs');

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  mysqlConnection.query("SELECT * FROM usersData", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    let message = 'Listing all users';
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  });
});

router.get('/:userId', function(req, res) {
  mysqlConnection.query("SELECT * FROM usersData WHERE id='" + req.params.userId + "'", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    let message = 'Reading a user by id: ' + req.params.userId;
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  });
});

router.post('/', function(req, res) {
  req.body.password = bcrypt.hashSync(req.body.password);

  var sql = "INSERT INTO usersData ";
      sql += "(name, email, password, homePhone, cellPhone) ";
      sql += "VALUES ";
      sql += "('"+req.body.name+"', '"+req.body.email+"', '"+req.body.password+"', '"+req.body.homePhone+"', '"+req.body.cellPhone+"');";
  
  mysqlConnection.query(sql, function (err, result, fields) {
    if (err) throw err;
    let message = 'Creating a user: ' + sql;
    res.send(message);
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  });
});

router.put('/:userId', function(req, res) {
  req.body.password = bcrypt.hashSync(req.body.password);

  var sql = "UPDATE usersData SET ";
      sql += "name = '"+req.body.name+"',";
      sql += "email = '"+req.body.email+"',";
      sql += "password = '"+req.body.password+"',";
      sql += "homePhone = '"+req.body.homePhone+"',";
      sql += "cellPhone = '"+req.body.cellPhone+"' ";
      sql += "WHERE id='"+req.params.userId+"'; ";

  mysqlConnection.query(sql, function (err, result, fields) {
    if (err) throw err;
    let message = 'Updating a user id: ' + req.params.userId;
    res.send(message);
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  });
});

router.post('/authenticate', function(req, res) {
  mysqlConnection.query("SELECT * FROM usersData WHERE email='" + req.body.email + "'", function (err, result, fields) {
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
      es.status(404).send('No user found.');
      var msg = log.showDate();
      console.log('', msg);
    }
  });
});

router.delete('/:userId', function(req, res) {
  mysqlConnection.query("DELETE FROM usersData WHERE id='" + req.params.userId + "'", function (err, result, fields) {
    if (err) throw err;
    let message = 'Deleting a user by id: ' + req.params.userId;
    res.send(message);
    console.log(message);
    var msg = log.showDate();
    console.log('', msg);
  });
});

module.exports = router;