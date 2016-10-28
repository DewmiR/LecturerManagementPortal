'use strict';

var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
	courseName: String,
	semester: String,
	year: String,
	image: String,
	enrollmentKey: String,
    lecturerIncharge: String,
    lecturerImage: String,
    status: String,
    lecInCharge: String,
    lastUpdated: String,
    created: String
});

var Course = module.exports = mongoose.model('Course',CourseSchema);


module.exports.createCourse = function(newCourse, callback){
    newCourse.save(callback);
}

module.exports.getAllCourses = function(callback){
    Course.find({},callback);
}

module.exports.getAllCoursesFirstYear = function(callback){
	var year = '1st Year';
	Course.find({ year:year },callback);
}

module.exports.getAllCoursesSecondYear = function(callback){
    var year = '2nd Year';
	Course.find({ year:year },callback);
}

module.exports.getAllCoursesThirdYear = function(callback){
    var year = '3rd Year';
	Course.find({ year:year },callback);
}

module.exports.getAllCoursesFourthYear = function(callback){
    var year = '4th Year';
	Course.find({ year:year },callback);
}

module.exports.getModulesSingle = function(id,callback){
    Course.findById(id,callback);
}

module.exports.checkEnrollmentKey = function(key, callback){
	Course.count( { enrollmentKey:key },callback);
} 

module.exports.getEnrollmentkeyByCourseId = function(id, callback){
    Course.find({ _id:id }, callback);
    //Course.findById(id, callback);
};


module.exports.displayAllCourses = function(callback){
    Course.find({},callback);
};

module.exports.getCourseNameById = function(cid,callback) {
    Course.find({ _id:cid }, callback);
}