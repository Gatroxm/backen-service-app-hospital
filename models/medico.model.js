var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var especialidades = {
    values: ['General', 'Cirujano', 'Nutricionista', 'Terapeuta'],
    message: '{PATH} no es un tipo permitido'
}

var medicoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El campo nombre es requerido"]
    },
    img: {
        type: String,
        required: false,
        default: ''
    },
    tipo: {
        type: String,
        required: [true, "El tipo de medico es requerido"],
        default: 'General',
        enum: especialidades
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, 'El id hospital es un campo obligatorio']
    }
}, { collection: 'medicos' });


module.exports = mongoose.model('Medico', medicoSchema);