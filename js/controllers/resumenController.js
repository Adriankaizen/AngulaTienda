//Muestra articulos almacenados en localstorage del carrito 
miCarrito.controller('resumenController', function resumenController($scope) { 
  //Accion boton agregar carrito 
    var resumen = JSON.parse(localStorage.getItem("carrito"));
    $scope.$emit('local', resumen);

//Elimina articuloseleccionado del resumen 
    $scope.eliminar = function (index) {
        $scope.carrito.splice(index, 1);
    };

});
