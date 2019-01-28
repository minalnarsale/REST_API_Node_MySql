const express = require('express')
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var serverPort = 8080;

//defining routes
app.use('/', require('./routes'));

//starting server
app.listen(serverPort,() => {
    console.log("server started on " + serverPort);
});
