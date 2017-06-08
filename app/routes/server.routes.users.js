// Invocar al modo JavaScript 'strict'
'use strict';

// cargar controller 'users'
var users = require('../../app/controllers/server.controller.users'),
	passport = require('passport');

//define el metodo del modulo routes
module.exports = function(app){
	// Configurar las rutas signup
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	// Configurar las rutas signin
	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', { // utilizar estrategia local
			successRedirect: '/redirect',
			failureRedirect: '/signin',
			failureFlash: true
		}));

	app.route('/redirect')
		.get( function(req, res) {
			if (req.isAuthenticated()) {
				if (req.user.tipoUsuario === "Administrativo") {
					res.redirect('/#!/home_administrativo');
				}
				else if (req.user.tipoUsuario === "Administrador de Sistema") {
					res.redirect('/#!/home_administrador');
				}
				else if (req.user.tipoUsuario === "Directivo") {
					res.redirect('/#!/home_directivo');
				}else{
					res.redirect('/signin');
				}
			}
		});

	// Configurar la ruta signout
	app.route('/signout')
		.get(users.signout);

	// //configura la ruta base para users
	//  app.route('/users')
	//   .post(users.create)
	//   .get(users.listAll);

	// app.route('/users/:userId')
	//   .get(users.read)
	//   .put(users.update)
	//   .delete(users.delete);

//	app.param('userId', users.findUserByID);
};