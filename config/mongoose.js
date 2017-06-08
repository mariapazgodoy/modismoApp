var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function(){
	// Conectar a mongo db

	var db = mongoose.connect(config.DBuri);
	// Cargar modelos de base de datos
	require('../app/models/server.model.user');

	require('../app/models/server.model.diccionario');
	require('../app/models/server.model.modismo');
	require('../app/models/server.model.idioma');
	require('../app/models/server.model.pais');
	//retornar instancia de mongoose
	return db;
}


