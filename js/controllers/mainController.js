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
    //Almacena articulos comprados en localstorage
    $scope.saveCarrito = function () {
        var source = new Array();
        for (var i = 0; i < $scope.carrito.length; i++) {            
            source[i] = {
                "description": $scope.carrito[i].Producto.description,
                "Cantidad": $scope.carrito[i].Cantidad,
                "price": $scope.carrito[i].Producto.price,
                "image": $scope.carrito[i].Producto.image
            };           
        }
        
        localStorage.setItem("carrito", JSON.stringify(source));
    }
    //Actualiza resumen con informacion del localstorage
    $scope.$on('local', function (event, data) {
        $scope.carrito = [];
        for (var i = 0; i < data.length; i++) {
            $scope.carrito.push({
                Producto: data[i],
                Cantidad: data[i].Cantidad
            });
        }
    });
    //Inserta articulos en el menu del carrito
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
    //Formatea el precio a tipo money
    $scope.formatoMoneda = function (valor) {
        var valor = parseFloat(valor).toFixed(2);
        return "$ " + valor;
    }
    $scope.actualiza = function () {
        $scope.sumaTotal();
        $scope.cantidadTotal();
    }
    //Muestra el precio total  de los articulos añadidos al carrito
    $scope.sumaTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.carrito.length; i++) {
            total += $scope.carrito[i].Producto.price * $scope.carrito[i].Cantidad;
        }
        return "$ " + total.toFixed(2);
    }
    //Muestra la cantidad total de articulos añadidos al carrito
    $scope.cantidadTotal = function () {
        var cantidad = 0;
        for (var i = 0; i < $scope.carrito.length; i++) {
            cantidad = parseInt(cantidad) + parseInt($scope.carrito[i].Cantidad);
        }
        return cantidad
    }
});
