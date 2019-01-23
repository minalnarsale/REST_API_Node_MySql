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
    if(err) throw err;
});

exports.getUserById = function(req, res){

    var userId = req.params.userId;
    var returnObject = {};
    var sql = 'SELECT*FROM user where userId=' + userId;

    con.query(sql, function (err, result) {
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
    var sql1 =  "SELECT userName from user WHERE userName LIKE" +"\"" + params.userName + "\"" + ";";

    con.query(sql1, function (err, response) {
        if(err) {
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else if(response.length!=0){
            res.status(200);
            returnObject.status = "duplicate userName is not allowed!";
        }else{
            var sql = "INSERT INTO user(userName, email, password) VALUES ("+ "\"" + params.userName + "\""+ ","+ "\"" +
                params.email+ "\"" + ","+ "\"" + params.password+ "\"" + ");";
            con.query(sql, function (err, result) {
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
                        var sql2 = 'SELECT*FROM user where userId=' + result.insertId;
                        con.query(sql2, function (err, response) {
                            returnObject.data = response;
                        });
                        res.setHeader('Content-Type', 'application/json');
                    }
                }
            });
        }
        res.send(returnObject);
    });
}

exports.userLogin = function(req, res){

    var params = req.body;
    var returnObject = {};
    var sql = "SELECT*FROM user WHERE userName="+"\""+params.userName+"\"" +" AND password="+"\""+params.password+"\";";

    con.query(sql, function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "inValid user";
            }else{
                res.status(200);
                returnObject.status = "Valid User";
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

    var userId = req.url.substring(req.url.lastIndexOf("/") + 1, req.url.length);
    sql = sql.slice(0, -1) + " WHERE userId =" + userId + ";";

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
                var sql2 = 'SELECT*FROM user where userId=' + userId;
                con.query(sql2, function (err, response) {
                    returnObject.data = response;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(returnObject);
                });
            }
        }
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
                returnObject.status = "users deleted with userName : " + userId;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(returnObject);
    });
}
