angular.module('modismoApp').controller('ModismoController', ['$scope', 'Authentication', '$location', 'ModismoService', 'ModismoResource', 'DiccionarioResource', 'PaisResource', 'IdiomaResource',
	function($scope, Authentication, $location, ModismoService, ModismoResource, DiccionarioResource, PaisResource, IdiomaResource){
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		$scope.idiomas = IdiomaResource.query();
		$scope.paises  = PaisResource.query();
        $scope.modismos = ModismoResource.query();
        $scope.diccionarios  = DiccionarioResource.query();


		// Configuración
		$scope.pais = ModismoService.pais;
		$scope.idioma = ModismoService.idioma;

		// Traducción
		$scope.modismo = null;
		$scope.traduccion = null;


		$scope.setup = function(){
			if($scope.idioma != null && $scope.idioma != '' && $scope.pais != null && $scope.pais != '') {
				ModismoService.idioma = $scope.idioma;
				ModismoService.pais   = $scope.pais;
				$location.path('translate');
			}else{
				$scope.error = 'Seleccione idioma y País que visita por favor!';
			}
		};

        $scope.addPais= function(){
            var pais = new PaisResource({
                nombre: this.nombrePais
            });
            // Usar el método '$save' de medico para enviar una petición POST apropiada
            pais.$save(function(response) {
                // Si un medico fue creado de modo correcto, redireccionar al usuario a la página del medico 
                console.log('pais agregado !!');
                $scope.paises  = PaisResource.query();
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

		$scope.addIdioma= function(){
            var idioma = new IdiomaResource({
                nombre: this.nombreIdioma
            });
            // Usar el método '$save' de medico para enviar una petición POST apropiada
            idioma.$save(function(response) {
                // Si un medico fue creado de modo correcto, redireccionar al usuario a la página del medico 
                console.log('idioma agregado !!');
                $scope.idiomas = IdiomaResource.query();
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
		};

		$scope.addModismo= function(){
            var modismo = new ModismoResource({
                modismo: this.modismoModismo,
                pais: $scope.pais._id
            });
            // Usar el método '$save' de medico para enviar una petición POST apropiada
            modismo.$save(function(response) {
                // Si un medico fue creado de modo correcto, redireccionar al usuario a la página del medico 
                console.log('modismo agregado !!');
                $scope.modismoBD = response;
                $scope.modismos = ModismoResource.query();
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
		};
		$scope.addDiccionario = function(){
            var diccionario = new DiccionarioResource({
                modismo: $scope.modismo._id,
                idioma: $scope.idioma._id,
                traduccion: this.traduccion
            });
            console.log(diccionario);
            // Usar el método '$save' de medico para enviar una petición POST apropiada
            diccionario.$save(function(response) {
                // Si un medico fue creado de modo correcto, redireccionar al usuario a la página del medico 
                console.log('diccionario agregado !!');
                $scope.diccionarios  = DiccionarioResource.query();
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
		};

		$scope.translate = function(){
			// findOne
			console.log('traducir "' + $scope.modismo + '" al '+ $scope.idioma._id);
            $scope.significado = DiccionarioResource.get({
                idiomaId: $scope.idioma._id,
                modismoNombre: $scope.modismo
            });
        };
	}
]);