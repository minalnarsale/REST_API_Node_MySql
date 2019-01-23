var mysql = require('mysql');
var config = require('./../config');
var con = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
	database : config.database
});

con.connect(function(err) {
    if (err) throw err;
	console.log("connection successful");
});

con.query('create table user(userId int AUTO_INCREMENT PRIMARY KEY, userName varchar(255), email varchar(255), password varchar(255))', function (err, res) {
    if(err) throw err;
    console.log("table-user created");
});

var sql = "INSERT INTO user(userName, email, password) VALUES ?";
var values = [
    ["minal","minalnarsale@gmail.com","Minki@1992"],
    ["ganesh","ganujasud@gmail.com","Ganu@1990"]
];
con.query(sql, [values], function (err, res) {
    if(err) throw err;
    console.log(values.length + " records inserted!");
});

con.query('create table post(postId int AUTO_INCREMENT, userId int, title varchar(255), body varchar(255), date DATE, PRIMARY KEY(postId), FOREIGN KEY(userId) REFERENCES user(userId));', function (err, res) {
    if(err) throw err;
    console.log("table-post created");
});

var sql = "INSERT INTO post(userId, title, body, date) VALUES ?";
var values = [
    ["2","Creative Handmade Rose Bear Soap Flower","Dresslily Main Features Made of PE material, beautiful, light and eco-friendly Three colors are available Cute bear appearance", "2019-01-14"],
    ["1","Chocolate making tray","100,00kr", "2008-03-21"],["1","vacancy for node.js developer ","requirements : node.js, REST API, MySql, Microservices, MongoDB, Express.js", "2008-03-21"]
];
con.query(sql,[values], function (err, res) {
   if(err) throw err;
   console.log(values.length + " records inserted!");
});

con.end();