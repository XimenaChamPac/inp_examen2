var express  = require("express"),  
    app      = express(),
	bodyParser  = require("body-parser"),
	methodOverride = require("method-override");
    mongoose = require('mongoose');
	

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Importar los modelos y controladores
var models = require('./models/blog')(app, mongoose);
var blogPublicacionCtrl = require('./controllers/publicacionBlog');


var router = express.Router();

router.get('/', function(req, res) {  
   res.send("pregunta 1, USE POSTMAN PARA REALIZAR LAS CONSULTAS DEL TIPO CRUD.");
});

app.use(router);
mongoose.connect('mongodb://localhost/blogsAQP', function(err, res) {  
  if(err) {
    console.log('ERROR: conectando la base de datos. ' + err);
  }
  app.listen(3000, function() {
    console.log("El servidor esta corriendo en: http://localhost:3000");
	console.log("Base de datos Corriendo en: mongodb://localhost/blogs");
  });
});

// Rutas del API para publicar en el Blog con CRUD
var blogpublicaciones = express.Router();

blogpublicaciones.route('/publicaciones')  
  .get(blogPublicacionCtrl.obtenerPublicaciones)
  .post(blogPublicacionCtrl.agregarPublicacionBlog);

blogpublicaciones.route('/publicaciones/:id')  
  .get(blogPublicacionCtrl.obtenerPublicacionesPorId )
  .put(blogPublicacionCtrl.actualizarPublicacionBlog)
  .delete(blogPublicacionCtrl.eliminarPublicacionBlog );

app.use('/api', blogpublicaciones );  