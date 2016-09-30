'use strict';

var mongoose = require('mongoose');

var EnrollSchema = new mongoose.Schema({
	courseId: String,
	userId: String,
	userName: String,
	userImage: String,
    userType : String
});

var Enroll = module.exports = mongoose.model('Enroll',EnrollSchema);


module.exports.createNewEnroll = function(newEnroll, callback){
    newEnroll.save(callback);
};

module.exports.getUsersEnrolledInCourse = function(courseId,userType, callback){
    Enroll.find({courseId: courseId},callback);
};


module.exports.addNewEnrollment = function(enrollment,callback){

     var enroll =new Enroll();
      enroll.courseId = enrollment.course_id;
      enroll.userId = enrollment.student_id;
      enroll.userName = "test";
      enroll.userImage = "test";
      enroll.save(callback);
};

module.exports.isEnrolled = function(userId, callback){
    Enroll.find({ userId: userId },callback);
};