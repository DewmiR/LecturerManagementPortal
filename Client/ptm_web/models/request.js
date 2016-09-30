'use strict';

var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
	requestFrom: String,
	requestTo: String,
	status: String,
	requestFromName: String
});

var Request = module.exports = mongoose.model('Request',RequestSchema);


module.exports.createRequest = function(newRequest, callback){
    newRequest.save(callback);
}

module.exports.getAllRequests = function(userId, status, callback){
    Request.find({ requestTo:userId , status:status }, callback);
}