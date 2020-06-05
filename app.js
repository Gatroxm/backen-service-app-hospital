// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// Importar rutas
var appRoutes = require('./router/index.router');
var usuarioRoutes = require('./router/usuario.router');
var loginRoutes = require('./router/login.router');
var hospitalRoutes = require('./router/hospital.router');
var medicoRoutes = require('./router/medico.router');
var busquedaRoutes = require('./router/busqueda.router');
var uploadRoutes = require('./router/upload.router');
var imagenesRoutes = require('./router/imagenes.router');
// inicializar variables
var app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Conección a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;

    console.log('Base de datos Online');

})

//rutas

app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/', appRoutes);

//Escuhar peticiones

app.listen(3000, () => {
    console.log("Express server puerto 3000: \x1b[32m%s\x1b[0m   ", " online");
});