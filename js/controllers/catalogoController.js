miCarrito.controller('catalogoController', function catalogoController($scope, $http) {
    //Variables Inicialización Paginación
        $scope.currentPage = 0;
        $scope.pageSize = 80;
        $scope.productos = [];
      

    $scope.titulo = "Articulos";
    //Carga catologo de articulos   
    $http({
        method: 'GET',
        url: 'http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products',
        params: '',
    }).success(function (data) {
        $scope.productos = data;
    }).error(function () {
        alert("Error al conectarse con el servicio Catalogo");
    });
    //Accion boton agregar carrito
    $scope.agregar = function (p) {
        $scope.$emit('to_parent', p);
    }
    //Cuenta numero de paginas
    $scope.numberOfPages = function () {
        return Math.ceil($scope.productos.length / $scope.pageSize);
    }
    });

    //Se creo filtro para incializar paginación
    miCarrito.filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });