// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var PaisSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: 'Debe ingresar el nombre del País'
  }
});

mongoose.model('Pais', PaisSchema);