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

    var userId = req.params.userId;
    var returnObject = {};

    con.query('SELECT*FROM user where userId=' + userId, function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "Data Not Found";
            }else{
                res.status(200);
                returnObject.status = "user Available";
                returnObject.data = result;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(returnObject);
    });
}


exports.createUser = function(req, res){

    var params = req.body;
    var returnObject = {};

    con.query("INSERT INTO user(userName, email, password) VALUES ("+ "\"" + params.userName + "\""+ ","+ "\"" +
        params.email+ "\"" + ","+ "\"" + params.password+ "\"" + ");", function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "Data Not Found";
            }else{
                res.status(200);
                returnObject.status = "user got created!";
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(returnObject);
    });
}

exports.createUser = function(req, res){

    var params = req.body;
    var returnObject = {};

    con.query("INSERT INTO user(userName, email, password) VALUES ("+ "\"" + params.userName + "\""+ ","+ "\"" +
        params.email+ "\"" + ","+ "\"" + params.password+ "\"" + ");", function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "Data Not Found";
            }else{
                res.status(200);
                returnObject.status = "user got created!";
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(returnObject);
    });
}

exports.updateUser = function(req, res){

    let params = req.body;
    var returnObject = {};
    let sql = "UPDATE user SET ";
    let fieldsToUpdate = Object.keys(params);

    for(let i=0;i<Object.keys(params).length;i++)
    {
        var keyParam = fieldsToUpdate[i];
        sql = sql + keyParam + "=" + "\"" + params[keyParam] + "\"" + ",";
    }

    sql = sql.slice(0, -1) + " WHERE userId =" + req.url.substring(req.url.lastIndexOf("/") + 1, req.url.length) + ";";
    con.query(sql, function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "User Not Found";
            }else{
                res.status(200);
                returnObject.status = "user got updated!";
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(returnObject);
    });
}

exports.deleteUser = function(req, res){

    var userId = req.params.userId;
    var returnObject = {};
    let sql = "DELETE FROM user WHERE userName=" + "\"" + req.url.substring(req.url.lastIndexOf("/") + 1,
        req.url.length) + "\"" + ";";
    con.query(sql , function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "User Not Found";
            }else{
                res.status(200);
                returnObject.status = "user deleted";
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(returnObject);
    });
}
