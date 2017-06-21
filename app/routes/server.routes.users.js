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
				if (req.user.tipoUsuario === "Administrador") {
					res.redirect('/#!/admin');
				}
				else if (req.user.tipoUsuario === "Usuario") {
					res.redirect('/#!/settings');
				}else{
					res.redirect('/signin');
				}
			}
		});

	// Configurar la ruta signout
	app.route('/signout')
		.get(users.signout);

	 app.route('/api/users')
	  .post(users.requiresLogin, users.create)
	  .get(users.requiresLogin, users.listAll);

	app.route('/api/users/:userId')
	  .get(users.requiresLogin, users.read)
	  .put(users.requiresLogin, users.update)
	  .delete(users.requiresLogin, users.delete);
	app.param('userId', users.findUserByID);

};