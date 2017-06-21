# modismoApp
Una applicación web y móvil para traducir modismo de distintos paises a diferentes idiomas.


## Configuración del entorno de ejecución
Una vez instalado node y mongoDB se debe ingresar a la carpeta del repositorio y ejecutar los siguientes comandos desde terminal:
1. mpn install
2. bower update

## Ejecucción de la App
Luego, para ejecutar la app se deben cumplir los siguientes pasos:
1. levantar servicio MongoDB (Sin este servicio la app no se podrá ejecutar).
2. ejecutar la aplicación con el comando "node server" desde la terminal.
3. ingresar a la applicación en la url localhost:3000

## Poblar Base de datos
Para poblar la base de datos con los modismos, traducciones, paises e idiomas hay una interfaz para su creación (Sólo creación) en localhost:3000/#!/admin


<!-- El elemento mensaje error -->
<div class="row contact-wrap"  data-ng-show="error"> 
   <div uib-alert ng-class="'alert-danger'" class="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-sm-10 col-sm-offset-1" close="closeAlert()">{{error}}</div>
</div>
        // Funcion para cerrar los mensajes de error
        $scope.closeAlert = function(){
            $scope.error = null;
        }        
