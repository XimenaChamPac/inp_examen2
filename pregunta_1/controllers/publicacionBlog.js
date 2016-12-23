	var mongoose = require('mongoose');  
var blogPublicacion = mongoose.model('blog');

//GET - todas las publicaciones
exports.obtenerPublicaciones = function(req, res) {  
    blogPublicacion.find(function(err, blogpublicacion) {
    if(err) res.send(500, err.message);

    console.log('GET /blogpublicacion')
        res.status(200).jsonp(blogpublicacion);
    });
};

//GET - busqueda de publicaciones por Identificador
exports.obtenerPublicacionesPorId = function(req, res) {  
    blogPublicacion.findById(req.params.id, function(err, blogpublicacion) {
    if(err) return res.send(500, err.message);

    console.log('GET /blogpublicacion/' + req.params.id);
        res.status(200).jsonp(blogppublicacion);
    });
};

//POST - Insertar una publicacion
exports.agregarPublicacionBlog= function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var blogpublicacion = new blogPublicacion({
        titulo:    req.body.titulo,
        autor:     req.body.autor,
        foto:  req.body.foto,
        publicacion:   req.body.publicacion
    });

    blogpublicacion.save(function(err, blogpublicacion) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(blogpublicacion);
    });
};



// - Actualizar una publicacion ya realizada
exports.actualizarPublicacionBlog = function(req, res) {  
    blogPublicacion.findById(req.params.id, function(err, blogpublicacion) {
        blogpublicacion.titulo   = req.body.petId;
        blogpublicacion.autor    = req.body.autor;
        blogpublicacion.foto = req.body.foto;
        blogpublicacion.publicacion  = req.body.publicacion;
       
        blogpublicacion.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(blogpublicacion);
        });
    });
};


//DELETE - Eliminar publicaciones del blog
exports.eliminarPublicacionBlog = function(req, res) {  
    blogPublicacion.findById(req.params.id, function(err, blogpublicacion) {
        blogpublicacion.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};