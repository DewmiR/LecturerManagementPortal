var express = require("express");
var router = express.Router();
var Project = require("../models/project");
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
		courseName: req.body.courseName,
	    projectName: req.body.projectName,
	    projectId: req.body.projectId
	});

	ProjectOfCourse.createProjectOfCourse(newCourseProject,function (err,newCourseProject) {
		if(err) throw err;
	});

	res.send("pass");
});


router.get('/getAllProjectOfCourse', function (req, res) {

	ProjectOfCourse.getAllProjectOfCourse(function(err,projects){
		if(err) throw err;
		res.send(projects);
	});
});

module.exports = router;
