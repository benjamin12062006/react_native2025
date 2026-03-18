
const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        // type: mongoose.Schema.Types.ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto', // Referencia al proyecto al que pertenece la tarea
    },
    estado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);
