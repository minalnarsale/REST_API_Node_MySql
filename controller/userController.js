'use strict'

exports.getUserById = function(req, res){
    console.log("req : " +req.url.substring(req.url.lastIndexOf("/") + 1, req.url.length));
    var userId = req.url.substring(req.url.lastIndexOf("/") + 1, req.url.length);
    res.send("userId : " + userId);
}