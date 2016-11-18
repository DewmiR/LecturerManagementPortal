/**
 * Created by DewmiR on 11/2/2016.
 */

'use strict';

var mongoose = require('mongoose');

var MeetingSchema = new mongoose.Schema({
    header: String,
    body: String,
    date: String,
    time : String,
    from : String,
    to : String,
    year :String,
    month:String,
    status:String
});

var Meeting = module.exports = mongoose.model('Meeting',MeetingSchema);

module.exports.getAllMeetings = function(callback){
    Meeting.find({from:"user"},callback);
};


module.exports.sendMeetingReq = function( callback){

};

/*
module.exports.getLecturersAssigned = function( callback){
    Asgnlec.find({},callback);
};
*/


