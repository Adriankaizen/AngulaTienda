miCarrito.controller('resumenController', function resumenController($scope) {
    alert(2);
    var resumen = localStorage.getItem("carrito");
    $scope.resumenCarrito = JSON.parse(resumen);
    console.log($scope.resumenCarrito);

    $scope.eliminar = function (p) {
        alert(p);
        $scope.$emit('to_parent', p);
    }


});
