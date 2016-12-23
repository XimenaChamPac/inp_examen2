var express = require('express'),
	mongoose = require('mongoose'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	path = require('path'),
	methodOverride = require('method-override'),
	app = express();

mongoose.connect('mongodb://localhost:27017/BlogAQP');
var BlogAQPPost = require('./models/blogModel').Blog;


	app.use(express.static(path.join(__dirname, 'public')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(methodOverride());
var index = require(__dirname + '/controllers/index.js');
app.use('/', index);


var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection',function(socket){
	socket.on('saveOne',function(dataIn){
		console.log(dataIn);
		BlogAQPPost.create({
			titulo: dataIn.titulo,
			publicacion:dataIn.publicacion,
			fechaPublicacion:dataIn.fechaPublicacion,
			foto:dataIn.foto,
			autor:dataIn.autor,	
			done: false
		}, function (err, blog) {
				if(err){
					console.log(err);
				}
				BlogAQPPost.find(function(err, blogs) {
					if(err){
						console.log(err);
					}			
					socket.emit('sendAll', blogs);		
					socket.broadcast.emit('sendAll', blogs);
				});
			});
	});
});


http.listen(3000, function(){
  console.log('Escuchando por el puerto :3000');
});
