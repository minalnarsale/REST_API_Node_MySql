'use strict'

const mysql = require('mysql')
const {host,user,password,database} = require('./../config')

//creating database connection
var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});
con.connect(function (err) {
    if(err)
        console.log("database connection failed");
    else
        console.log("database connection successful!");
});

exports.getUserById = function(req, res){

    console.log("req : " +req.url.substring(req.url.lastIndexOf("/") + 1, req.url.length));
    var userId = req.url.substring(req.url.lastIndexOf("/") + 1, req.url.length);

    con.query('SELECT*FROM user where userId=' + userId, function (err, result) {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send({"data":result});
    });
}