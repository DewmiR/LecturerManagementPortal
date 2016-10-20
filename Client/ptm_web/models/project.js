'use strict';

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	name: String,
    description: String
});

// var ProjectOfCourseSchema = new mongoose.Schema({
// 	courseName: String,
//     projectName: String,
//     projectId: String
// });

var Project = module.exports = mongoose.model('Project',ProjectSchema);
//var ProjectOfCourse = module.exports = mongoose.model('ProjectOfCourse',ProjectOfCourseSchema);


module.exports.createProject = function(newproject, callback){
    newproject.save(callback);
}


module.exports.getAllPrpjects = function(callback){
	Project.find({},callback);
}


// module.exports.createProjectOfCourse = function(newProjectOfCourse, callback){
//     newProjectOfCourse.save(callback);
// }


// module.exports.getAllProjectOfCourse = function(callback){
// 	ProjectOfCourse.find({},callback);
// }