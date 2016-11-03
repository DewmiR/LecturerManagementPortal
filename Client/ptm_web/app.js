'use strict';
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//models
var User = require("./models/user");
var Course = require("./models/course");
var Enroll = require("./models/enroll");
var Request = require("./models/request");
var assignedLecs = require("./models/assignedLecturer");
var Project = require("./models/project");
var courseModuleGroups = require("./models/courseModuleGroups");
var courseGroupMembers = require("./models/courseGroupMembers");
var Meeting =  require("./models/meeting");
var projects = require('./routes/projects');

mongoose.connect("mongodb://localhost:27017/ptm_db");


/*************************
     Configurations
*************************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {

	//console.log('${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}');


	next();
});
app.use(express.static("./app"));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  	function(username, password, done) {


     	User.getUserByUsername(username, function(err, user){

	        if(err) throw err;

	        if(!user){
	        	console.log("User not found...");
	          	return done(null, false, {message: 'Unknown User'});
	        }else{


	            console.log("User found by username...");
	            return done(null, user);
	        }

	        // User.comparePassword(password, user.password, function(err, isMatch){

	        //     if(err) throw err;

	        //     if(isMatch){
	        //         console.log("User found with username & password.");
	        //         return done(null, user);
	        //     } else {
	        //         console.log("User found with username, But password is wrong.");
	        //         return done(null, false, {message: 'Invalid password'});
	        //     }

	        // });
     	});
  	}
));

passport.serializeUser(function(user, done) {
    console.log("serializeUser called");
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("deserializeUser called");
    User.getUserById(id, function(err, user) {
    	//console.log(user);
        done(err, user);
    });
});



/*************************
        Routes
*************************/

app.get('/', function (req, res) {
   res.sendfile('app/index.html');
});

app.post("/getUser",function(req,res){
   // console.log(req.body);
   // console.log(res);
    res.send(req.user);
});

app.post('/login', passport.authenticate('local',
    {
    	successRedirect:'/pass',
        failureRedirect:'/fail'
    }), function(req, res) {
    res.redirect('/as');
});


app.get('/pass', function (req, res) {
   res.send("pass");
});

app.get('/test', function (req, res) {


	var newCourse = Course({
		courseName: "DBMS",
		image: "course_05.jpg",
		enrollmentKey: "1",
        lecturerIncharge: "Mr.Prasanna",
        lecturerImage:"testi_01.png"
	});


	Course.createCourse(newCourse,function (err,data) {
		//console.log(data);
    	if(err) throw err;
	});
});

app.get('/test2', function (req, res) {


	var newEnrollment = Enroll({
		courseId: "57e171ae7d3a621708c85bd3",
		userId: "57e16fa47d3a621708c85bd2",
		userName: "prageeth"
	});


	Enroll.createNewEnroll(newEnrollment,function (err,data) {
		//console.log(data);
    	if(err) throw err;
	});
});

app.post('/createNewcourseModuleGroups', function (req, res) {

    
	var NewcourseModuleGroups = courseModuleGroups({
		groupName: "Clash",
        leaderStudentId: "it141",
        cgpa: "3.50",
		userId: "580f2873551e64166ccf1065",
		userName: "test",
        userImage: "testi_01.png",
        courseId: "58046638ad4aaa0020beadbb",
        lecturerAccepted: "0",
        memberCount: 1
	});

	courseModuleGroups.createNewcourseModuleGroups(NewcourseModuleGroups,function (err,data) {
		//console.log(data);
    	if(err) throw err;
	});
});


app.post('/createNewcourseGroupMembers', function (req, res) {

//    console.log(req.body.gid);
//    console.log(req.body.courseid);
//    console.log(req.body.userid);
    
	var NewcourseModuleGroupMembers = courseGroupMembers({
        groupId: req.body.gid,
        courseId: req.body.courseid,
		userId: req.body.userid
	});

	courseGroupMembers.createNewcourseGroupMembers(NewcourseModuleGroupMembers,function (err,data) {
		
    	if(err) throw err;
	});
    
    
});


app.get('/getAllCourses', function (req, res) {
	Course.getAllCourses(function(err,courses){
		if(err) throw err;
       // console.log(courses);
		res.send(courses);
	});
});

app.post('/getAllCourseGroups', function (req, res) {
	courseModuleGroups.getAllCourseGroups(req.body.cid,function(err,groups){
		if(err) throw err;
       // console.log(courses);
        //console.log(groups);
		res.send(groups);
	});
});

app.get('/getAllCoursesFirstYear', function (req, res) {
	Course.getAllCoursesFirstYear(function(err,courses){
		if(err) throw err;

		res.send(courses);
	});
});

app.get('/getAllCoursesSecondYear', function (req, res) {
	Course.getAllCoursesSecondYear(function(err,courses){
		if(err) throw err;

		res.send(courses);
	});
});

app.get('/getAllCoursesThirdYear', function (req, res) {
	Course.getAllCoursesThirdYear(function(err,courses){
		if(err) throw err;

		res.send(courses);
	});
});
app.get('/getAllCoursesFourthYear', function (req, res) {
	Course.getAllCoursesFourthYear(function(err,courses){
		if(err) throw err;

		res.send(courses);
	});
});

app.post('/getModulesSingle', function (req, res) {

    Course.getModulesSingle(req.body.id,function (err,courseDetails) {
        if(err) throw err;
        res.send(courseDetails);
    });
    //console.log(req.body.id);
});

app.get('/getAllLecturers', function (req, res) {
    User.getAllLecturers(function (err,lecturers) {
        if(err) throw err;
        res.send(lecturers);
    });
});

app.post('/getUsersEnrolledInCourse', function (req, res) {

	Enroll.getUsersEnrolledInCourse(req.body.cid,req.body.uType,function (err,friends) {
    	if(err) throw err;
    	res.send(friends);
	});
});

app.post('/getEnrollmentkeyByCourseId', function (req, res) {
	Course.getEnrollmentkeyByCourseId(req.body.cid,function (err,key) {
        if(err) throw err;

       // console.log(key);
    	res.send(key);

	});


});

app.post('/checkEnrollmentKey', function (req, res) {

	Course.checkEnrollmentKey(req.body.cid,function (err,count) {
    	if(err) throw err;
    	// console.log("Count: "+ count);
    	res.sendStatus(count);
	});

});

app.post('/isEnrolled', function (req, res) {

	Enroll.isEnrolled(req.body.user_id,function (err,courses) {
    	if(err) throw err;
        res.send(courses);
	});
    
    //console.log(req.body);
	
});


app.post('/addNewEnrollment', function (req, res) {
    var enrollment = req.body;

	Enroll.addNewEnrollment(enrollment,function (err,count) {
    	if(err) throw err;
    	res.send("New Enrollment Added");
	});
//    console.log(enrollment.course_id)
	
});

app.post('/registerUser', function (req, res) {
	//console.log(req.body.name);

	var newUser = new User({
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		itnum : req.body.itnum
	});

	User.createUser(newUser,function (err,user) {
		if(err) throw err;
	});


	res.send("pass");
});

app.post('/acceptFriendRequest', function (req, res) {
//	console.log(req.body);

	Request.acceptFriendRequest(req.body.id,function (err,user) {
		if(err) throw err;
	});
//
//
	res.send("Accepted");
});

app.post('/setRequestAcceptStatus', function (req, res) {
	//console.log(req.body);

	Enroll.setRequestAcceptStatus(req.body.id,req.body.cid,function (err,user) {
		//console.log(user)
        if(err) throw err;
	});
//
//
	res.send("Accepted");
});


app.post('/diclineFriendRequest', function (req, res) {
	//console.log(req.body);

	Request.diclineFriendRequest(req.body.id,function (err,user) {
		if(err) throw err;
	});
//
//
	res.send("Dicline");
});

app.post('/sendRequestToFriend', function (req, res) {

	var newRequest = new Request({
		requestFrom : req.body.from,
		requestTo : req.body.to,
        courseId : req.body.cid,
        gId: req.body.gid,
		status : req.body.status,
		requestFromName : req.body.fromName,
        acceptStatus: req.body.acceptStatus,
        pending: req.body.pending
	});

    
	Request.createRequest(newRequest,function (err,request) {
		if(err) throw err;
	});


	res.send("pass");
});

app.post('/getReceivedRequests', function (req, res) {
	var userId =
	Request.getAllRequests(req.body.userId, req.body.status, function(err,data){
		if(err) throw err
		res.send(data)
	})
});

app.post('/getGroupCount', function (req, res) {
	
 //   console.log(req.body.gid);
	Request.getGroupCount(req.body.gid, function(err,data){
		if(err) throw err
       // console.log(data);
        
		res.send( data.toString())
	})
});

app.post('/getGroupId', function (req, res) {
    
	Request.getGroupId(req.body.userId, req.body.courseId, function(err,data){
		if(err) throw err
		res.send(data)
	})
});


app.post('/isGroupFormed', function (req, res) {
    
    
//	Request.isGroupFormed(req.body.userId, req.body.status, function(err,data){
//		if(err) throw err
//		res.send(data)
//	})
});

app.post('/getMyFriendsRequests', function (req, res) {
//	console.log(req.body);
	Request.getMyFriendsRequests(req.body.userId, function(err,data){
		if(err) throw err
		res.send(data)
//        console.log(data);
	})
});


app.get('/getAllLecturers', function (req, res) {
	User.getAllLecturers(function(err,lecturers){
		if(err) throw err;
		console.log(lecturers);
		res.send(lecturers);
	});
});


app.get('/displayAllModules', function (req,res) {
   Course.displayAllCourses(function (err,courses) {
	   if(err) throw err;
	    res.send(courses);
   });
});

app.post('/getAssigenedLecturers', function (req,res) {
    var courseName = req.body.courseName;
    assignedLecs.getLecturersAssignedToCourse(courseName,function (err,lecturers) {
        if(err) throw err;
        res.send(lecturers);
    });
});




app.use('/projects', projects);



app.post('/assignLecturer', function (req,res) {
	var newAsgnlec = new assignedLecs({
		courseName : req.body.courseName,
		userName : req.body.userName,
		post : req.body.post
	});

	assignedLecs.assignNewLecturer(newAsgnlec,function (err,lecturers) {
		if(err) throw err;
		res.send(lecturers);
	});
});



app.get('/getAllAssigenedLecturers', function (req,res) {
	assignedLecs.getLecturersAssigned(function (err,lecturers) {
		if(err) throw err;
		res.send(lecturers);
	});
});


//Student Services

app.post('/getGroupCountMembers', function (req, res) {
    
	courseGroupMembers.getGroupCount(req.body.gid, function(err,data){
		if(err) throw err
		res.send({count:data.toString(),gid:req.body.gid})
	})
});

app.post('/updateMemberCount', function (req, res) {
    //console.log(req.body.gid);
    
	courseModuleGroups.updateMemberCount(req.body.gid, function(err,data){
		if(err) throw err
		//res.send("updated");
	})
});


app.post('/getmemberCount', function (req, res) {
    //console.log(req.body.gid);
    
	courseModuleGroups.getmemberCount(req.body.gid, function(err,data){
		if(err) throw err
       // console.log(data);
		res.send(data.toString());
	})
    
});

app.post('/assignLecturerForModule', function (req, res) {
    
    Course.assignLecturerForModule(req.body.moduleName,req.body.lecName,function (err) {
		if(err) throw err;
        res.send("pass");
	});

});
app.post('/changeEnrolmentKey', function (req, res) {

    Course.changeEnrolmentKey(req.body.moduleName,req.body.newKey,function (err) {
        if(err) throw err;
        res.send("pass");
    });

});


/*
 * API end point to get all meetings
 * */
app.get('/getMeetings', function (req,res) {
	Meeting.getAllMeetings(function (err,meetings) {
		if(err) throw err;
		res.send(meetings);
	});
});



/*************************
        Server
*************************/

app.listen(3000);
console.log("Express app running on port 3000");
module.exports = app;
