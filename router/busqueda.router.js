var express = require('express');
var app = express();
var Hospita = require('../models/hospital.model');
var Medicos = require('../models/medico.model');
var Usuario = require('../models/usuario.model');
/*
 *   Busqueda espesifica
 */

app.get('/colleccion/:tabla/:busqueda', (req, res) => {
    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    switch (tabla) {
        case 'usuarios':
            buscarUsuario(busqueda, regex).then(usuaros => {
                res.status(200).json({
                    ok: true,
                    usuaros: usuaros
                });
            });
            break;
        case 'medicos':
            buscarMedicos(busqueda, regex).then(medicos => {
                res.status(200).json({
                    ok: true,
                    medicos: medicos
                });
            });
            break;
        case 'hospitales':
            buscarHopitales(busqueda, regex).then(hospitales => {
                res.status(200).json({
                    ok: true,
                    hospitales: hospitales
                });
            });
            break;
        default:
            res.status(400).json({
                ok: false,
                mensaje: 'No exixte nunguna colección con ese nombre en la base de datos',
            });
            break;
    }

});

/*
 *   Busqueda general
 */
app.get('/todo/:busqueda', (req, res) => {
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
        buscarHopitales(busqueda, regex),
        buscarMedicos(busqueda, regex),
        buscarUsuario(busqueda, regex)
    ]).then(respuestas => {
        res.status(200).json({
            ok: true,
            hospitales: respuestas[0],
            medicos: respuestas[1],
            usuaros: respuestas[2],
        });
    });

});

function buscarHopitales(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Hospita.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .exec((err, hospitales) => {
                if (err) {
                    reject('Error al cargar hospitales', err);
                } else {
                    resolve(hospitales);
                }
            });
    });
}

function buscarMedicos(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Medicos.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .populate('hospital')
            .exec((err, medicos) => {
                if (err) {
                    reject('Error al cargar medicos', err);
                } else {
                    resolve(medicos);
                }
            });
    });
}

function buscarUsuario(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Usuario.find({}, 'id nombre email img role').or([
            { 'nombre': regex },
            { 'email': regex }
        ]).exec((err, usuaros) => {
            if (err) {
                reject('Error al cargar Usuarios', err);
            } else {
                resolve(usuaros);
            }
        });
    });
}
module.exports = app;