var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var CLIENT_ID = require('../config/config').CLIENT_ID;
var app = express();

var Usuario = require('../models/usuario.model');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

app.post('/', (req, res) => {
    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el usuario',
                errors: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el coreo: ' + body.email + ' no existe',
                errors: { mensage: 'No existe un usuario con ese Correo' }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Contraseña invalida',
                errors: { mensage: 'Contraseña invalida' }
            });
        }

        //crear un token
        usuarioDB.password = ':)';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            id: usuarioDB._id,
            token: token
        });

    });

});
/** Google **/
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
    }
}
app.post('/google', async(req, res) => {
    var token = req.body.token;
    var googeUser = await verify(token).catch(e => {
        return res.status(403).json({
            ok: false,
            mensaje: 'token no válido'
        });
    });

    Usuario.findOne({ email: googeUser.email }, (err, res) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el usuario',
                errors: err
            });
        }
        if (usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el coreo: ' + body.email + ' no existe',
                errors: { mensage: 'No existe un usuario con ese Correo' }
            });
        }
    });

    // res.status(200).json({
    //     ok: true,
    //     mensaje: 'OK!!',
    //     googeUser: googeUser
    // });
});

module.exports = app;