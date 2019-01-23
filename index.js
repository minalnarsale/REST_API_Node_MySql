const express = require('express')

var app = express();
var serverPort = 8080;

//defining routes
app.use('/', require('./routes'));

//starting server
app.listen(serverPort,() => {
    console.log("server started on " + serverPort);
});
