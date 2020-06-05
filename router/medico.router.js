var express = require('express');
var Medico = require('../models/medico.model');
var { verificaToken } = require('../midelware/autenticacion');
var app = express();
app.get('/', (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    Medico.find({}, 'id nombre img tipo usuario hospital')
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .exec((err, medicosDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar los Médicos',
                    errors: err
                });
            }
            Medico.count({}, (err, conteo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al contar los Médicos',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    total: conteo,
                    medicos: medicosDB
                });
            });
        });
});
app.post('/', verificaToken, (req, res) => {
    var body = req.body;
    var medico = new Medico({
        nombre: body.nombre,
        img: body.img,
        tipo: body.tipo,
        usuario: req.usuario._id,
        hospital: body.hospital
    });

    medico.save((err, medico) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Error al crear el Médico',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            medico: medico
        });
    });
});

app.put('/:id', verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Medico.findById(id, (err, medico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el Médico',
                errors: err
            });
        }
        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Médico con el id: ' + id + ' no existe',
                errors: { mensage: 'No existe un Médico con ese ID' }
            });
        }
        medico.nombre = body.nombre;
        medico.tipo = body.tipo;
        medico.usuario = req.usuario._id;
        medico.hospital = body.hospital;

        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el Médico',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });
        });
    });
});

app.delete('/:id', verificaToken, (req, res) => {
    var id = req.params.id;
    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el Medico',
                errors: err
            });
        }
        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El Médico con el id: ' + id + ' no existe',
                errors: { mensage: 'No existe un Médico con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });
    });
});
module.exports = app;