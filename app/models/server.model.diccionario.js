// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var DiccionarioSchema = new Schema({
  modismo: {
    type: Schema.ObjectId,
    ref: 'Modismo'
  },
  idioma: {
    type: Schema.ObjectId,
    ref: 'Idioma'
  },
  traduccion: {
    type: String,
    trim: true,
    required: 'Debe ingresar el país de origen de los modismos'
  }
});

mongoose.model('Diccionario', DiccionarioSchema);
