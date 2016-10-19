'use strict';

var mongoose = require('mongoose');


var ProjectOfCourseSchema = new mongoose.Schema({
	courseName: String,
    projectName: String,
    projectId: String
});


var ProjectOfCourse = module.exports = mongoose.model('ProjectOfCourse',ProjectOfCourseSchema);




module.exports.createProjectOfCourse = function(newProjectOfCourse, callback){
    newProjectOfCourse.save(callback);
}


module.exports.getAllProjectOfCourse = function(callback){
	ProjectOfCourse.find({},callback);
}