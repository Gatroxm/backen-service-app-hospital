// Requires
var express = require('express');
var mongoose = require('mongoose');
// inicializar variables

var app = express();

//Conección a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;

    console.log('Base de datos Online');

})

//rutas
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada'
    })
});
//Escuhar peticiones

app.listen(3000, () => {
    console.log("Express server puerto 3000: \x1b[32m%s\x1b[0m   ", " online");
});