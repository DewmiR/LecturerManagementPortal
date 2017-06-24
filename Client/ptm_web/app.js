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
var nodemailer = require('nodemailer');

//models
var User = require("./models/user");
var Course = require("./models/course");
var assignedLecs = require("./models/assignedLecturer");
var Meeting =  require("./models/meeting");
var DeletedMeeting =  require("./models/deletedMeeting");

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


/*
* EMail trasporter object
* */
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'dewDevops@gmail.com',
		pass: 'intel@123'
	}
});



/*
* Configure passport authentication strategy
* */
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

/*
* Rote to index file
* */
app.get('/', function (req, res) {
   res.sendfile('app/index.html');
});


/*
* Get current user
* */
app.post("/getUser",function(req,res){
    res.send(req.user);
});

/*
* Api endpoint for Login request
* */
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


app.post('/getUsers', function (req, res) {
    console.log(req.body.uid);
	User.getUsers(req.body.uid,function(err,groups){
		if(err) throw err;
       // console.log(courses);
		res.send(groups);
	});
});

/*
* Api end point to get all courses
* */
app.get('/getAllCourses', function (req, res) {
	Course.getAllCourses(function(err,courses){
		if(err) throw err;
       // console.log(courses);
		res.send(courses);
	});
});


/*
* API end point to get single modules
* */
app.post('/getModulesSingle', function (req, res) {
	console.log(req.body.id);
    Course.getModulesSingle(req.body.id,function (err,courseDetails) {
        if(err) throw err;
        res.send(courseDetails);
    });
    //console.log(req.body.id);
});


/*
* Get all lecturers
* */
app.get('/getAllLecturers', function (req, res) {
    User.getAllLecturers(function (err,lecturers) {
        if(err) throw err;
        res.send(lecturers);
    });
});




app.post('/getEnrollmentkeyByCourseId', function (req, res) {
	Course.getEnrollmentkeyByCourseId(req.body.cid,function (err,key) {
        if(err) throw err;

       // console.log(key);
    	res.send(key);

	});


});


/*
* API end point to check enrollement key
* */
app.post('/checkEnrollmentKey', function (req, res) {

	Course.checkEnrollmentKey(req.body.cid,function (err,count) {
    	if(err) throw err;
    	// console.log("Count: "+ count);
    	res.sendStatus(count);
	});

});


/*
* Check users enrolled for a module
* */
app.post('/isEnrolled', function (req, res) {
	Enroll.isEnrolled(req.body.user_id,function (err,courses) {
    	if(err) throw err;
        res.send(courses);
	});
    
    //console.log(req.body);
	
});


/*
* Register a user
* */
app.post('/registerUser', function (req, res) {
	//console.log(req.body.name);

	var newUser = new User({
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		itnum : req.body.itnum,
        email : req.body.username,
        gpa : "3.45"
	});

	User.createUser(newUser,function (err,user) {
		if(err) throw err;
	});


	res.send("pass");
});


/*
* Get all lecturers
* */
app.get('/getAllLecturers', function (req, res) {
	User.getAllLecturers(function(err,lecturers){
		if(err) throw err;
		console.log(lecturers);
		res.send(lecturers);
	});
});


/*
* Display all modules
* */
app.get('/displayAllModules', function (req,res) {
   Course.displayAllCourses(function (err,courses) {
	   if(err) throw err;
	    res.send(courses);
   });
});


/*
* Get lecturers assigned for modules
* */
app.post('/getAssigenedLecturers', function (req,res) {
    var courseName = req.body.courseName;
    assignedLecs.getLecturersAssignedToCourse(courseName,function (err,lecturers) {
        if(err) throw err;
        res.send(lecturers);
    });
});



/*
* Assign a lecturer to a module
* */
app.post('/assignLecturer', function (req,res) {
	var newAsgnlec = new assignedLecs({
		courseName : req.body.courseName,
		userName : req.body.userName,
		post : req.body.post,
		image : req.body.image
	});

	assignedLecs.assignNewLecturer(newAsgnlec,function (err,lecturers) {
		if(err) throw err;
		res.send(lecturers);
	});
});



/*
* Get all lecturers assigned for modules
 * */
app.get('/getAllAssigenedLecturers', function (req,res) {
	assignedLecs.getallLecturersAssigned(function (err,lecturers) {
		if(err) throw err;
		res.send(lecturers);
	});
});


/*
* Get lecturers assigned for modules by module
 * */
app.post('/getAssignedLecturers', function (req, res) {
	assignedLecs.getLecturersAssigned(req.body.courseName,function(err,lecturers){
		if(err) throw err;
		res.send(lecturers);
	})
});

/*
* Get Modules Assigned For Lecturer
* */
app.post('/getModulesAssignedForLecturer', function (req, res) {

	assignedLecs.getModulesAssignedForLecturer(req.body.lecName,function (err,data) {
		if(err) throw err;
		res.send(data);
	});

});


/*
* Get Modules Assigned For Supervisor
* */
app.post('/getModulesAssignedForSupervisor', function (req, res) {

	assignedLecs.getModulesAssignedForSupervisor(req.body.lecName,function (err,data) {
		if(err) throw err;
		res.send(data);
	});

});


/*
* Assign Lecturer For Module
* */
app.post('/assignLecturerForModule', function (req, res) {

	Course.assignLecturerForModule(req.body.moduleName,req.body.lecName,function (err) {
		if(err) throw err;
		res.send("pass");
	});

});


/*
* Change Enrolment Key
* */
app.post('/changeEnrolmentKey', function (req, res) {

    Course.changeEnrolmentKey(req.body.moduleName,req.body.newKey,function (err) {
        if(err) throw err;
        res.send("pass");
    });

});


/*
* Add a new Lecturer
* */
app.post('/addNewLecturer', function (req, res) {

	User.addNewLecturer(function (err) {
		if(err) throw err;
		res.send("pass");
	});

});


/*
 * Send meeting requests
 * */
app.post('/sendMeetingReq', function (req,res) {
	console.log("to");
    console.log(req.body.to);
	console.log("from");
	console.log(req.body.from);

	var newMeeting = new Meeting({
		header: req.body.subject,
		body: req.body.body,
		date: req.body.date,
		time : req.body.time,
		from : req.body.from,
		to : req.body.to,
		venue:req.body.venue,
		year :req.body.year,
		month:req.body.month,
		status:"accepted"
	});

	Meeting.createMeeting(newMeeting,function (err,data) {
		//console.log(data);
		if(err) throw err;
	});

	var mailOptions = {
		from: 'SLIIT TM portal👥 <comtale.noreply@gmail.com>', // sender address
		to: req.body.to, // list of receivers
		subject: req.body.subject, // Subject line
		text: req.body.body, // plaintext body
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});

});



app.post('/GetDeletedMeetings', function (req,res) {

	console.log(req.body.header);
	console.log(req.body.body);
	console.log(req.body.date);
	console.log(req.body.time);
	
	var newDeletedMeeting = new DeletedMeeting({
		header: req.body.header,
		body: req.body.body,
		date: req.body.date,
		time: req.body.time,
		from: req.body.from,
		to: req.body.to,
		venue: req.body.venue
	});

	DeletedMeeting.createDelMeeting(newDeletedMeeting, function (err, data) {
		//console.log(data);
		if (err){
		  console.log(err);
		}
	});
});


/*
 * API end point to get all meetings
 * */
app.post('/getMeetings', function (req,res) {

	Meeting.getAllMeetings(req.body.user,req.body.date	,function (err,meetings) {
		if(err) throw err;
		res.send(meetings);
	});
});


/*
 * API end point to get all meetings for month
 * */

app.post('/getMeetingsForMonth', function (req,res) {

	console.log(req.body.date);

	Meeting.getMeetingsForMonth(req.body.user,req.body.date,req.body.month,function (err,meetings) {
		if(err) throw err;
		res.send(meetings);
		console.log(meetings);
	});
});


/*
 * API end point to find meetings by ID
 * */

app.post('/findMeetingById', function (req,res) {

	Meeting.findMeetingByID(req.body.id,function (err,meeting) {
		if(err) throw err;
		res.send(meeting);
	});
});


/*
 * API end point to update meetings
 * */
app.post('/updateMeetingAppointment', function (req, res) {
	console.log(req.body.venue);

	Meeting.updateAppointment(req.body._id,req.body.header,req.body.body,req.body.date,req.body.time,req.body.venue,function (err,meeting) {
		if(err) throw err;
		res.send(meeting);
	});
});



/*
 * API end point to delete a meetings
 * */

app.post('/deleteMeeting', function (req,res) {

	console.log(req.body._id);
	Meeting.DeleteAppointment(req.body._id,function (err,meeting) {
		if(err) throw err;
		res.send(meeting);
	});
});



/*
* Remove lecturers
* */
app.post('/removeAssignLecturers', function (req,res) {

	assignedLecs.DeleteLecturer(req.body._id,function (err,lecturer) {
		if(err) throw err;
		res.send(lecturer);
	});
});



app.get('/getAllLecturersNames', function (req, res) {
	User.getAllLecturersNames(function(err,lecturers){
		if(err) throw err;
		res.send(lecturers);
	});
});


app.post('/getModulesInCharge', function (req, res) {

	Course.getModulesInCharge(req.body.lecName,function (err,data) {
		if(err) throw err;
		res.send(data);
	});

});


/*************************
        Server
*************************/

app.listen(3000);
console.log("Express app running on port 3000");
module.exports = app;
