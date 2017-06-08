module.exports = function(app){
	var index = require('../controllers/server.controller.index'),
		users = require('../controllers/server.controller.users'),
		diccionario = require('../controllers/server.controller.diccionario'),
		modismo = require('../controllers/server.controller.modismo'),
		idioma = require('../controllers/server.controller.idioma');
		pais = require('../controllers/server.controller.pais'),

	app.get('/', index.render);	

	// Modismo
	app.route('/api/modismos')
	   .get(modismo.list)
	   .post(modismo.create);
	// app.route('/api/modismos/:modismoId')
	//    .get(modismo.read);

	// Diccionarios
	app.route('/api/diccionario')
	   .get(diccionario.list)
	   .post(diccionario.create);

	// Obtener Traducción
	app.route('/api/diccionario/:idiomaId/:modismoNombre')
	   .get(diccionario.getTraduccionByIdioma, diccionario.read);

	// Idiomas
	app.route('/api/idiomas')
	   .get(idioma.list)
	   .post(idioma.create);

	// PAISES
	app.route('/api/paises')
	   .get(pais.list)
	   .post(pais.create);

	// configurar parametros
	app.param('modismoNombre', modismo.modismoByNombre);
	app.param('diccionarioId', diccionario.diccionarioByID);
	app.param('idiomaId', idioma.idiomaByID);
	app.param('paisId', pais.paisByID);

};
