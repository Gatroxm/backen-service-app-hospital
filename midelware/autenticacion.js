var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// =====================
// Verificar Token
// =====================
var verificaToken = (req, res, next) => {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();

    });


};

// =====================
// Verifica AdminRole
// =====================
var verificaAdmin_Role = (req, res, next) => {

    var usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};
module.exports = {
    verificaToken,
    verificaAdmin_Role
}