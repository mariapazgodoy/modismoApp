angular.module('modismoApp')
  .provider('ModismoService', function () {

    // Private variables
    var _pais = null;
    var _idioma = null;

    // Private constructor
    function Greeter() {
      this.greet = function () {
        return {
            pais: _pais,
            idioma: _idioma,
            diccionario: _diccionario
        };
      };
    }

    // Method for instantiating
    this.$get = function () {
      return new Greeter();
    };
});
