var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var Course = require("../models/course")
var ProjectOfCourse = require("../models/projectOfCourse");


router.post('/createProject', function (req, res) {
	
	var newProject = new Project({
		name : req.body.name,
		description : req.body.desc
	});

	Project.createProject(newProject,function (err,project) {
		if(err) throw err;
	});

	res.send("pass");
});


router.get('/getAllProjects', function (req, res) {

	Project.getAllPrpjects(function(err,projects){
		if(err) throw err;
		res.send(projects);
	});
});


router.post('/createProjectOfCourse', function (req, res) {

	var newCourseProject = new ProjectOfCourse({
		course: req.body.course,
		project:  req.body.project
	});

	ProjectOfCourse.createProjectOfCourse(newCourseProject,function (err,newCourseProject) {
		if(err) throw err;

		res.send("pass");
	});
	
});

router.get('/getAllProjectOfCourse', function (req, res) {

	ProjectOfCourse.getAllProjectOfCourse(function(err,projects){
		if(err) throw err;

		console.log(projects)
		res.send(projects);
	});
});

router.post('/getProjectsListForCourse', function (req, res) {

	ProjectOfCourse.getProjectsByCourseID(req.body.cid,function(err,projects){

		console.log(projects)

		if(err) throw err;
		res.send(projects);
	});
});

router.post('/bidForProject', function (req, res) {

	//res.send("bid received for "+req.body.cid +" user: " + req.body.user.name)
	ProjectOfCourse.addNewBids(req.body.poc,req.body.user,function(err,data){
		res.send(data)
	})
	
});


router.post('/declineBit', function (req, res) {
	ProjectOfCourse.declineBit(req.body.bid,req.body.poc,function(err,data){
	 	res.send(data)
	})
});

router.post('/approveBit', function (req, res) {
	ProjectOfCourse.approveBit(req.body.bid,req.body.poc,function(err,data){
		res.send(data)
	})
});

router.post('/recoverBit', function (req, res) {
	ProjectOfCourse.recoverBit(req.body.bid,req.body.poc,function(err,data){
		res.send(data)
	})
});

router.post('/removeBit', function (req, res) {
	ProjectOfCourse.removeBit(req.body.bid,req.body.poc,function(err,data){
		res.send(data)
	})
})

module.exports = router;
