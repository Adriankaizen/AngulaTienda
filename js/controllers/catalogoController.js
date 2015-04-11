
miCarrito.controller('catalogoController', function catalogoController($scope, $http) {
    $scope.titulo = "Articulos";
    //Carga catologo de articulos   
    $http({
        method: 'GET',
        url: 'http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products',
        params: '',
    }).success(function (data) {
        console.log(data);
        $scope.productos = data;
       
    }).error(function () {
        alert("Error al conectarse con el servicio Catalogo");
    });
    //Accion boton agregar carrito
    $scope.agregar = function (p) {
        $scope.$emit('to_parent', p);
    }
    
});