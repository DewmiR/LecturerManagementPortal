'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
	name: String,
    description: String,
    notices: [{
        title: String,
        description: String,
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        created_at: { type: Date, default: Date.now },
        name: String
    }],
    created: { type: Date, default: Date.now }
});



var Project = module.exports = mongoose.model('Project',ProjectSchema);
//var ProjectOfCourse = module.exports = mongoose.model('ProjectOfCourse',ProjectOfCourseSchema);


module.exports.createProject = function(newproject, callback){
    newproject.save(callback);
}


module.exports.getAllPrpjects = function(callback){
	Project.find({},callback);
}

module.exports.getProjectData = function(pid,callback){
	Project.find({'_id':pid},callback);
}

module.exports.postNoticeForProject = function(user,project,title,description,callback){
	Project.findByIdAndUpdate(
        project,
        { 
            $push: {
                "notices": {
                    "title": title,
                    "description": description,
                    "by": user,
                    "name": user.name            
                }
            }
        },
        {
            safe: true, 
            upsert: true, 
            new : true
        },
        callback
    );
}