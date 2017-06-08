angular.module('modismoApp').config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/settings', {
		templateUrl: 'index/views/client.view.settings.html',
		controller: 'ModismoController'
	})
	.when('/translate', {
		templateUrl: 'index/views/client.view.translate.html',
		controller: 'ModismoController'
	})
	.when('/admin', {
		templateUrl: 'index/views/client.view.admin.html',
		controller: 'ModismoController'
	})
	.otherwise({
		redirectTo: '/settings'
	});
}]);