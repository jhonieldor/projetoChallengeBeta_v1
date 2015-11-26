var app = angular.module('app', ['ngMaterial', 'ngRoute', 'md.data.table', 'eits-dwr-broker', 'eits-bottomsheet', 'eits.material.core', 'md.data.table', 'eits.controls.table', 'eits.search.tags', 'eits.controls.paper-sheet', 'eits.containers.box', 'eits.containers.hbox', 'eits.containers.vbox', 'eits.date.picker', 'eits.controls.infinite-scroll']);


app.controller('AppCtrl', ['$scope', '$rootScope', '$mdSidenav', function ($scope, $rootScope, $mdSidenav, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        if ($location != undefined && $location.path() == '/lancamento_vendas') {
            $rootScope.mainMenu = false;
        } else {
            $rootScope.mainMenu = true;

        }




    }])

        .config(function ($routeProvider, $importServiceProvider, $mdThemingProvider, $provide) {
            $importServiceProvider.setBrokerURL("/challenge/dwr/interface");


            $routeProvider
                    .when('/', {
                        templateUrl: './app/welcome.jsp'
                    })

                    .when('/clientes', {
                        templateUrl: './app/clientes.jsp',
                        controller: 'ClienteCtrl'
                    })

                    .when('/produtos', {
                        templateUrl: './app/produtos.jsp',
                        controller: 'ProdutoCtrl'
                    })

                    .when('/vendas', {
                        templateUrl: './app/vendas.jsp',
                        controller: 'VendaCtrl'
                    })

                    .when('/usuarios', {
                        templateUrl: './app/usuarios.jsp',
                        controller: 'UsuarioCtlr'
                    })

                    .when('/lancamento_vendas', {
                        templateUrl: './app/lancamento_vendas.jsp',
                        controller: 'VendaCtrl'

                    })


                    .otherwise({
                        redirectTo: '/'
                    });


        });

