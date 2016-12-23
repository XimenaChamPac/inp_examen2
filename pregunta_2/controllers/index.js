var express = require('express');
var router = express.Router();
var Todo = require('../models/blogModel').Blog;

router.get('/', function(req,res) {
	res.sendFile('index.html');
});
router.get('/api/todos', function(req, res){
	Todo.find(function(err, todos) {
		if(err){
			console.log(err);
		}
		res.json(todos);
	});
});
router.post('/api/todos', function(req, res){
	Todo.create({
		titulo: req.body.titulo,
		publicacion: req.body.publicacion,
		done: false
	}, function (err, todo) {
		if(err){
			console.log(err);
		}
		Todo.find(function(err, todos) {
			if(err){
				console.log(err);
			}
			res.json(todos);
		});
	});
});

router.delete('/api/todos/:blog', function(req,res){
	Todo.remove({
		_id:req.params.blog
	}, function(err, blog) {
		if(err){
			console.log(err);
		}
		Todo.find(function(err,todos){
			if(err){
				console.log(err);
			}
			res.json(todos);
		});
	});
});

module.exports = router;