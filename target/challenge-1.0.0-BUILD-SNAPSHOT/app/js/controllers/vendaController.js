app.controller('VendaCtrl', ['$q', '$scope', '$rootScope', '$mdToast', '$log', '$injector', '$importService', '$mdDialog', '$timeout', '$location',
    function ($q, $scope, $rootScope, $mdToast, $log, $injector, $importService, $mdDialog, $timeout, $location) {
        $importService("vendaService");
        $scope.selected = [];

        if ($location.path() == '/lancamento_vendas') {
            $rootScope.mainMenu = false;
        } else {
            $rootScope.mainMenu = true;
        }
        ;

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

        $scope.dialogAddProdutoVenda = function (ev) {
            $mdDialog.show({
                controller: produtoVendaDialogController,
                templateUrl: './app/dialogs/vendas/produtoVenda_dialog.html',
                targetEvent: ev,
                hasBackdrop: true,
                locals: {
                    entidadeExterna: new ProdutoVenda()
                }
            })

                    .then(function (result) {
                        $mdToast.cancel();
                        var toast = $mdToast.simple().content('InclusÃ£o do produto realizada com sucesso!')
                                .action('Fechar')
                                .highlightAction(false)
                                .position('bottom left right');
                        $mdToast.show(toast).then(function () {
                        });
                    }, function () {
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
            $location.path('/lancamento_vendas');
            $rootScope.mainMenu = false;
        }

        $scope.salvarVenda = function () {
            $location.path('/vendas');
            $rootScope.mainMenu = true;
        }

        $scope.cancelarVenda = function () {
            $location.path('/vendas');
            $rootScope.mainMenu = true;
        }

        function produtoVendaDialogController($scope, $mdDialog, $mdToast, entidadeExterna) {
            if (entidadeExterna != null) {
                $scope.entidade = entidadeExterna;
                $scope.modoAlteracao = true;
            } else {
                $scope.entidade = new ProdutoVenda();
                $scope.modoAlteracao = false;
            }

            $scope.validaForm = function () {
                if (!$scope.produtoVendaForm.$valid) {
                    $mdToast.cancel();
                    $mdToast.show($mdToast.simple()
                            .content('Preencha todos os campos obrigatórios')
                            .action('Fechar')
                            .highlightAction(false)
                            .position('bottom left right'))
                            .then(function () {
                            });
                    return false;
                } else {
                    return true;
                }
            }

            $scope.cancelar = function () {
                $mdDialog.cancel();
            };

            $scope.confirmar = function () {
                if ($scope.validaForm()) {
                    produtoService.salvar($scope.entidade, {
                        callback: function (result) {
                            $mdDialog.hide(result);
                            $scope.$apply();
                        },
                        errorHandler: function (message, error) {
                            $mdToast.cancel();
                            $mdToast.show($mdToast.simple()
                                    .content(message)
                                    .action('Fechar')
                                    .highlightAction(false)
                                    .position('bottom left right'))
                                    .then(function () {
                                    });
                        }
                    });
                }
                ;
            }

        }



    }]);