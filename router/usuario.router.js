var express = require('express');
var Usuario = require('../models/usuario.model');

var { verificaToken } = require('../midelware/autenticacion');

var bcrypt = require('bcryptjs');

var app = express();
/* Obteneter los usuarios */
app.get('/', (req, res) => {
    Usuario.find({}, 'id nombre email img role').exec((err, usuariosdb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cargar los usuarios',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuarios: usuariosdb
        });
    });
});

/* Crear nuevo usuario */

app.post('/', verificaToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        img: body.img
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no válido',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioDB,
            usuariotoken: req.usuario
        });
    });

});

/* Actualizar usuarios */

app.put('/:id', verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el usuarios',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id: ' + id + ' no existe',
                errors: { mensage: 'No existe un usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuarios',
                    errors: err
                });
            }
            usuarioGuardado.password = ':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});

/* Borrar usuarios */

app.delete('/:id', verificaToken, (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el usuarios',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id: ' + id + ' no existe',
                errors: { mensage: 'No existe un usuario con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    })
});

module.exports = app;