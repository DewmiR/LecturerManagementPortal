'use strict';

var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
	courseName: String,
	image: String,
	enrollmentKey: String
});

var Course = module.exports = mongoose.model('Course',CourseSchema);


module.exports.createCourse = function(newCourse, callback){
    newCourse.save(callback);
}

module.exports.getAllCourses = function(callback){
    Course.find({},callback);
    // Course.aggregate([
    //     {
    //         $lookup:
    //             {
    //                 from: "Enroll",
    //                 localField:"_id",
    //                 foreignField: "courseId",
    //                 as: "enrolled"
    //             }
    //     }
    // ],callback);
}

module.exports.checkEnrollmentKey = function(key, callback){
	Course.count( { enrollmentKey:key },callback);
} 

module.exports.getEnrollmentkeyByCourseId = function(id, callback){
    Course.find({ _id:id }, callback);
    //Course.findById(id, callback);
}