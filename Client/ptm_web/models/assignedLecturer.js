/**
 * Created by DewmiR on 9/30/2016.
 */
'use strict';

var mongoose = require('mongoose');

var asgnlecSchema = new mongoose.Schema({
    courseName: String,
    userName: String,
    post: String
});

var Asgnlec = module.exports = mongoose.model('Asgnlec',asgnlecSchema);

module.exports.getLecturersAssignedToCourse = function( courseName,callback){
    Asgnlec.find({courseName:courseName},callback);
};


