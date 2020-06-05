var express = require('express');
var fileUpload = require('express-fileupload')
var app = express();
var fs = require('fs');

var Usuario = require('../models/usuario.model');
var Medico = require('../models/medico.model');
var Hospital = require('../models/hospital.model');

app.use(fileUpload());

app.put('/:tipo/:id', (req, res) => {

    var tipo = req.params.tipo;
    var id = req.params.id;
    // tipos de colección 

    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección ' + tipo + ' no es valida',
            errors: {
                message: 'Tipo de colección no es valida'
            }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: {
                message: 'No selecciono imagen'
            }
        });
    }
    // obtener nombre del archivo

    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extencionArchivo = nombreCortado[nombreCortado.length - 1];

    //Extenciones permitidas

    var extencionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extencionesValidas.indexOf(extencionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extención no valida',
            errors: {
                message: 'Las extenciones valiodas son ' + extencionesValidas.join(', ')
            }
        });
    }

    // crear nombre de archivo personalizado

    var nombreArchivo = `${id}-${ new Date().getMilliseconds() }.${extencionArchivo}`;

    // mover el archivo del temporal a un path

    var path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover el archivo',
                errors: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, res);

    });


});

function subirPorTipo(tipo, id, nombreArchivo, res) {
    switch (tipo) {
        case 'usuarios':
            Usuario.findById(id, (err, usuarioDB) => {
                if (!usuarioDB) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El usuario con el id: ' + id + ' no existe',
                        errors: { mensage: 'No existe un usuario con ese ID' }
                    });
                }
                var pathViejo = './uploads/usuarios/' + usuarioDB.img;
                // si existe elimina la imagen anterior 
                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo, () => {});
                }
                usuarioDB.img = nombreArchivo;
                usuarioDB.save((err, usuarioActualizado) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error al actualizar el usuarios',
                            errors: err
                        });
                    }
                    usuarioActualizado.password = ':)';
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de usuario actualizada',
                        usuario: usuarioActualizado
                    })
                });
            });
            break;
        case 'medicos':
            Medico.findById(id, (err, medicoDB) => {
                if (!medicoDB) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El médico con el id: ' + id + ' no existe',
                        errors: { mensage: 'No existe un médico con ese ID' }
                    });
                }
                var pathViejo = './uploads/medicos/' + medicoDB.img;
                // si existe elimina la imagen anterior 
                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo, () => {});
                }
                medicoDB.img = nombreArchivo;
                medicoDB.save((err, medicoActualizado) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error al actualizar el médico',
                            errors: err
                        });
                    }
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de médico actualizada',
                        medico: medicoActualizado
                    })
                });
            });
            break;
        case 'hospitales':
            Hospital.findById(id, (err, hospitalDB) => {
                if (!hospitalDB) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El hospital con el id: ' + id + ' no existe',
                        errors: { mensage: 'No existe un hospital con ese ID' }
                    });
                }
                var pathViejo = './uploads/hospitales/' + hospitalDB.img;
                // si existe elimina la imagen anterior 
                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo, () => {});
                }
                hospitalDB.img = nombreArchivo;
                hospitalDB.save((err, hospitalActualizado) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error al actualizar el hospital',
                            errors: err
                        });
                    }
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de hospital actualizada',
                        hospital: hospitalActualizado
                    })
                });
            });
            break;
    }
}
module.exports = app;