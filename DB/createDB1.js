var mysql = require('mysql');
var config = require('./../config');
var con = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password
});

con.connect(function(err) {
    if (err) throw err;
	console.log("connection successful");
});
con.query('create database '+ config.database + ";", function (err, res) {
   if(err) throw err;
   console.log("database created");
});
con.end();