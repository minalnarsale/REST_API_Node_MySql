const mysql = require('mysql')
const {host,user,password,database} = require('./config')
const express = require('express')

var app = express();
var serverPort = 8080;

//connecting to database
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

//defining routes
app.use('/', require('./routes'));

//starting server
app.listen(serverPort,() => {
    console.log("server started on " + serverPort);
});
