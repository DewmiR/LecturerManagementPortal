'use strict';

var mongoose = require('mongoose');

var courseModuleGroupsSchema = new mongoose.Schema({
    groupName:String,
    leaderStudentId:String,
    cgpa:String,
	userId: String,
	userName: String,
	userImage: String,
    courseId: String
});

var courseModuleGroups = module.exports = mongoose.model('courseModuleGroups',courseModuleGroupsSchema);


module.exports.createNewcourseModuleGroups = function(newcourseModuleGroups, callback){
    newcourseModuleGroups.save(callback);
};

module.exports.getAllCourseGroups = function(callback){
    courseModuleGroups.find({},callback);
}

