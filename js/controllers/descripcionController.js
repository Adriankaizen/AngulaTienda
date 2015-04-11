miCarrito.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                // this next if is necessary for when using ng-required on your input. 
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^1-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
miCarrito.controller('descripcionController', function descripcionController($scope, $http, $routeParams, $sce) {
  //  $scope.message = 'Everyone come and see how good I look!';
    $scope.cantidad = 1;
    $scope.agregar = function (p) {
        $scope.$emit('to_parent', p);
    }

    $http({
        method: 'GET',
        url: 'http://api.ecommerce.next-cloud.mx/v1.0/demo.next-cloud.mx/products/' + $routeParams.sku,
        params: '',
    }).success(function (data) {
        console.log(data);

        $scope.descripcion = data;
        $scope.html = $sce.trustAsHtml($scope.descripcion.review);
    }).error(function () {
        alert("Error al conectarse on el servicio Detalle Producto");
    });

   
});


