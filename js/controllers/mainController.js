'use strict';
var miCarrito = angular.module("MiCarrito", ['ngRoute']);
//Configuración del enrutado de la aplicación
miCarrito.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "./views/catalogo.html",
        controller: "catalogoController"
    })
    .when("/descripcion/:sku", {
        templateUrl: "./views/descripcion.html",
        controller: "descripcionController"
    })
    .when("/resumen/", {
        templateUrl: "./views/resumen.html",
        controller: "resumenController"
    })
    .otherwise({ reditrectTo: "/" });
});

//Controlador de funcionalidades genericas
miCarrito.controller('mainController', function mainController($scope) {
    $scope.carrito = [];

    $scope.saveCarrito = function () {
        var source = new Array();
        for (var i = 0; i < $scope.carrito.length; i++) {            
            source[i] = {
                "descripcion": $scope.carrito[i].Producto.description,
                "cantidad": $scope.carrito[i].Cantidad,
                "precio": $scope.carrito[i].Producto.price
            };           
        }
        
        localStorage.setItem("carrito", JSON.stringify(source));
    }
    $scope.$on('to_parent', function (event, data) {
        var p = data;
        var itemActual;     
        
        for (var i = 0; i < $scope.carrito.length; i++) {
            if ($scope.carrito[i].Producto.sku == p.sku) {
                itemActual = $scope.carrito[i];
            }
        }
        if (!itemActual) {

            $scope.carrito.push({
                Producto: p,
                Cantidad: 1
            });
        } else {
            var sum = 1;
            
            if (document.getElementById('cantidad')) { sum=parseInt(document.getElementById("cantidad").value); }
            itemActual.Cantidad = parseInt(itemActual.Cantidad) + parseInt(sum);
           // itemActual.Cantidad++;
        }

    });

    $scope.formatoMoneda = function (valor) {
        var valor = parseFloat(valor).toFixed(2);
        return "$ " + valor;
    }

    $scope.sumaTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.carrito.length; i++) {
            total += $scope.carrito[i].Producto.price * $scope.carrito[i].Cantidad;
        }
        return "$ " + total.toFixed(2);
    }
    $scope.cantidadTotal = function () {
        var cantidad = 0;
        for (var i = 0; i < $scope.carrito.length; i++) {
            cantidad += cantidad + $scope.carrito[i].Cantidad;
        }
        return cantidad
    }
});
