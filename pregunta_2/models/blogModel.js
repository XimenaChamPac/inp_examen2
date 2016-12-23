'use strict';

var mongoose = require('mongoose');
var blogSchema = require('./blogSchema').blogSchema;

var models = {
	Blog: mongoose.model('Blog',blogSchema)
};

module.exports = models;