'use strict';

var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	name: String,
    description: String
});

var Project = module.exports = mongoose.model('Project',ProjectSchema);


module.exports.createProject = function(newproject, callback){
    newproject.save(callback);
}
