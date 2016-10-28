'use strict';

var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
	requestFrom: String,
	requestTo: String,
	status: String,
	requestFromName: String,
    acceptStatus: String
});

var Request = module.exports = mongoose.model('Request',RequestSchema);


module.exports.createRequest = function(newRequest, callback){
    newRequest.save(callback);
}

module.exports.getAllRequests = function(userId, status, callback){
    Request.find({ requestTo:userId , status:status }, callback);
}

module.exports.getFriendReceivedRequests = function(id,callback){
	Request.find({ requestTo:id },callback);
}

module.exports.getMyFriendsRequests = function(id,callback){
	Request.find({ requestFrom:id },callback);
}

module.exports.acceptFriendRequest = function(id,callback){
	Request.update({ _id:id },{ $set:{ status:"1",acceptStatus:"1"}},callback);
}

module.exports.diclineFriendRequest = function(id,callback){
	Request.update({ _id:id },{ $set:{ status:"1"}},callback);
}