var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gmail",
  database: "ks-node-api"
});

mysqlConnection.connect();

module.exports = mysqlConnection;