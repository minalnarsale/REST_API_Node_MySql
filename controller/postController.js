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

exports.getPostById = function(req, res){

    var postId = req.params.postId;
    var returnObject = {};
    var sql = 'SELECT*FROM post where postId=' + postId;

    con.query(sql, function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "post's data Not Found";
            }else{
                res.status(200);
                returnObject.status = "post Available";
                returnObject.data = result;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(returnObject);
    });
}

exports.findPosts = function(req, res){

    var searchStr = req.params.searchStr;
    var returnObject = {};
    var sql = "SELECT*FROM post where title LIKE " + "\"" + searchStr + "\"" + 'OR body LIKE' + "\"" + searchStr + "\"" + ";";
    con.query(sql, function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "posts are Not Available";
            }else{
                res.status(200);
                returnObject.status = "post Available";
                returnObject.data = result;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(returnObject);
    });
}

exports.createPost = function(req, res){

    var params = req.body;
    var returnObject = {};
    var sql = "INSERT INTO post(userId, title, body, date) VALUES ("+ "\"" + params.userId + "\""+
        ","+ "\"" + params.title+ "\"" + ","+ "\"" + params.body+ "\""+ "," +"\"" + params.date + "\"" + ");";
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
                returnObject.status = "post got created!";
                returnObject.data = result;
                var sql2 = 'SELECT*FROM post where postId=' + result.insertId;
                con.query(sql2, function (err, response) {
                    returnObject.data = response;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(returnObject);
                });
            }
        }
    });
}

exports.updatePost = function(req, res){

    let params = req.body;
    var returnObject = {};
    let sql = "UPDATE post SET ";
    let fieldsToUpdate = Object.keys(params);
    for(let i=0;i<Object.keys(params).length;i++)
    {
        var keyParam = fieldsToUpdate[i];
        sql = sql + keyParam + "=" + "\"" + params[keyParam] + "\"" + ",";
    }
    var postId = req.url.substring(req.url.lastIndexOf("/") + 1, req.url.length);
    sql = sql.slice(0, -1) + " WHERE postId =" + postId + ";";

    con.query(sql, function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "post Not Found";
            }else{
                res.status(200);
                returnObject.status = "post got updated";
                var sql2 = 'SELECT*FROM post where postId=' + postId;
                con.query(sql2, function (err, response) {
                    returnObject.data = response;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(returnObject);
                });
            }
        }
    });
}

exports.deletePost = function(req, res){

    var title = req.params.title;
    var returnObject = {};
    let sql = "DELETE FROM post WHERE title=" + "\"" + title + "\"" + ";";
    con.query(sql , function (err, result) {
        if(err){
            res.status(500);
            returnObject.status = "Internal Server Error";
        }else{
            if(result.length == 0){
                res.status(404);
                returnObject.status = "post Not Found";
            }else{
                res.status(200);
                returnObject.status = "posts deleted with title : " + title;
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(returnObject);
    });
}
