var express = require('express');
var router = express.Router();
var log = require('./../common/log');
var fs = require('fs');

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/options', function(req, res) {
  var vehOptionsData = [
    {
      id: '1_car',
      value: 'carro',
      viewValue: 'Carro'
    },
    {
      id: '2_bus',
      value: 'onibus',
      viewValue: 'Onibus'
    },
    {
      id: '3_mot',
      value: 'moto',
      viewValue: 'Moto'
    }
  ];

  res.send(vehOptionsData);

  let message = 'Listing all vehicle options';
  console.log(message);
  var msg = log.showDate();
  console.log('', msg);
});

module.exports = router;
