exports = module.exports = function(app, mongoose) {

var pulicacionBlogSchema = new mongoose.Schema({  
  titulo:    { type: String },
  fechaPublicacion:     { type: Date, "default":Date.now},
  autor:  { type: String },
  foto:   { type: String },
  publicacion:  { type: String }
});

mongoose.model('blog', pulicacionBlogSchema);
};