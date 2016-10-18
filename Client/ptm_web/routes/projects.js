var express = require("express");
var router = express.Router();
var Project = require("../models/project");


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

	var newCourseProject = new Project({
		courseName: req.body.courseName,
	    projectName: req.body.projectName,
	    projectId: req.body.projectId
	});

	Project.createProjectOfCourse(newCourseProject,function (err,newCourseProject) {
		if(err) throw err;
	});

	res.send("pass");
});


router.get('/getAllProjectOfCourse', function (req, res) {

	Project.getAllProjectOfCourse(function(err,projects){
		if(err) throw err;
		res.send(projects);
	});
});

module.exports = router;
