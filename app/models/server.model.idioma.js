// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var IdiomaSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: 'Debe ingresar el nombre del Idioma'
  }
});

mongoose.model('Idioma', IdiomaSchema);