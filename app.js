// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// Importar rutas
var appRoutes = require('./router/index.router');
var usuarioRoutes = require('./router/usuario.router');
var loginRoutes = require('./router/login.router');
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
app.use('/login', loginRoutes);
app.use('/', appRoutes);

//Escuhar peticiones

app.listen(3000, () => {
    console.log("Express server puerto 3000: \x1b[32m%s\x1b[0m   ", " online");
});