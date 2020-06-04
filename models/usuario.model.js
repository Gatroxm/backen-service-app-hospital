var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userRoles = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{PATH} no es un rol permitido'
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El campo nombre es requerido"]
    },
    email: {
        type: String,
        required: [true, "El correo es necesario"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es necesaria"]
    },
    img: {
        type: String,
        required: false,
        default: ''
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: userRoles
    }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);