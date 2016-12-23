'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemas = {
	blogSchema: new Schema({
		titulo: {type: String},
		publicacion:{type:String},
		fechaPublicacion:{type: Date,"default": Date.now},
		autor:{type:String},
		foto:{type:String}
	})
};

module.exports = schemas;