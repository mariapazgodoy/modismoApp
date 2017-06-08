var mainAppModuleName = 'Modismo-App';

var mainAppModule = angular.module(mainAppModuleName, [
	'ngResource',
	'ngRoute',
	'ui.bootstrap',
	'modismoApp', 
	'users'
]);

mainAppModule.config(['$locationProvider', 
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
]);

angular.element(document).ready(function(){
	angular.bootstrap(document, [mainAppModuleName]);
});
