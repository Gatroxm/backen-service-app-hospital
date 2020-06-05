var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var hospitalSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El campo nombre es requerido"]
    },
    img: {
        type: String,
        required: false,
        default: ''
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });

module.exports = mongoose.model('Hospital', hospitalSchema);