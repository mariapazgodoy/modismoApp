// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var ModismoSchema = new Schema({
  modismo: {
    type: String,
    trim: true,
    required: 'Debe ingresar el modismo'
  },
  pais: {
    type: Schema.ObjectId,
    ref: 'Pais'
  }
});

mongoose.model('Modismo', ModismoSchema);