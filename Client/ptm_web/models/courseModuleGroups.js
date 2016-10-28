'use strict';

var mongoose = require('mongoose');

var courseModuleGroupsSchema = new mongoose.Schema({
    groupName:String,
    leaderStudentId:String,
    cgpa:String,
	userId: String,
	userName: String,
	userImage: String,
    courseId: String,
    lecturerAccepted: String,
    memberCount: Number
    
});

var courseModuleGroups = module.exports = mongoose.model('courseModuleGroups',courseModuleGroupsSchema);


module.exports.createNewcourseModuleGroups = function(newcourseModuleGroups, callback){
    newcourseModuleGroups.save(callback);
};

module.exports.getAllCourseGroups = function(cid,callback){
    courseModuleGroups.find({ courseId:cid },callback);
}

module.exports.updateMemberCount = function(gid,callback){
   // console.log(gid);
	courseModuleGroups.update({ _id:gid },{ $inc:{ memberCount:1} },callback);
}

module.exports.getmemberCount = function(gid,callback){
    courseModuleGroups.count({ _id:gid },callback);
}