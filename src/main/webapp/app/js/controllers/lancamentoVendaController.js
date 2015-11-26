app.controller('LancamentoVendaCtrl', ['$q', '$scope', '$rootScope', '$mdToast', '$log', '$injector', '$importService', '$mdDialog', '$timeout',
    function ($q, $scope, $rootScope, $mdToast, $log, $injector, $importService, $mdDialog, $timeout) {
        $importService("vendaService");
        $scope.selected = [];
        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        }

        $scope.venda = {
            dataVenda: '',
            valorTotal: null
        };

        $scope.clientes = [];
        $scope.vendas = [];
        $scope.produtosVenda = [];
        $scope.cliente = null;
        $scope.vendasSelecionadas = [];
        $scope.produtosVendaSeleciondaos = [];

        $scope.desabilitarMenu = function () {
            $rootScope.mainMenu = false;
        }

        $scope.buscarClientes = function () {
            vendaService.buscarClientes({
                callback: function (result) {
                    $scope.clientes = result;
                    $scope.$apply();
                }, errorHandler: function (a, b) {
                    console.log(a);
                }
            })

        }

        /*function createFilterFort(query){
         var lowercaseQuery = angular.lowercase(query);
         return function filterFn(cliente){
         
         }
         }*/


        $scope.carregarVendas = function () {
            vendaService.listarVendas({
                callback: function (result) {
                    $scope.vendas = result;
                    $scope.$apply();
                }, errorHandler: function (a, b) {
                    console.log(a);
                }
            });
        };

        $scope.carregarProdutos = function (venda) {
            vendaService.listarProdutosVenda(venda, {
                callback: function (result) {
                    $scope.produtosVenda = result;
                    $scope.$apply();
                },
                errorHandler: function (message, exception) {
                    $log.error(message);
                }
            });
        }

        $scope.onopenchange = function (page, limit) {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve();
            }, 1500);

            return deferred.promise;
        };

        $scope.onorderchange = function (order) {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve();
            }, 1200);

            return deferred.promise;
        };

        $scope.lancarVendas = function () {
            console.log("lancar");
            $rootScope.mainMenu = false;
        }

        $scope.salvarVenda = function () {
            $rootScope.mainMenu = true;
        }

        $scope.cancelarVenda = function () {
            $rootScope.mainMenu = true;
        }




    }]);