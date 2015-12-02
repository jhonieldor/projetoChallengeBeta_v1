app.controller('ClienteCtrl', ['$q', '$scope', '$rootScope', '$mdToast', '$log', '$injector', '$importService', '$mdDialog', '$timeout', function ($q, $scope, $rootScope, $mdToast, $log, $injector, $importService, $mdDialog, $timeout) {
        'use strict';
        $importService("clienteService");
        // $injector.invoke('AbstractCRUDController', this, {$scope: $scope});

        $scope.ITEMS_PER_PAGE = 10;

        $scope.selected = [];

        $scope.query = {
            order: 'name',
            limit: 20,
            page: 1
        }

        $scope.clientes = [];
        $scope.clientesExcluir = [];
        $scope.totalVendasClientes = 0;

        $scope.carregarLista = function () {
            clienteService.listarClientes({
                callback: function (result) {
                    $scope.clientes = result;
                    $scope.$apply();
                }, errorHandler: function (a, b) {
                    console.log(a);
                }
            });
        };

        $scope.findByIdInArray = function (array, entity) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == entity.id) {
                    return i;
                }
            }
            return -1;
        }
        
        $scope.processarTotalVendas = function(){
            $scope.totalVendasClientes = 0;
            for(var i=0; i< clientes.length; i++){
                $scope.totalVendasClientes = $scope.totalVendasClientes + clientes[i].totalVendas;
            }
        }
        

        $scope.carregarLista();

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
            }, 1500);

            return deferred.promise;
        };

        $scope.dialogNovoCliente = function (ev) {
            $mdDialog.show({
                templateUrl: './app/dialogs/clientes/cliente_dialog.html',
                controller: clienteDialogController,
                targetEvent: ev,
                hasBackdrop: true,
                locals: {
                    entidadeExterna: new Cliente()
                }
            }
            )

                    .then(function (result) {
                        //$scope.clientes.push(result); 
                        $scope.carregarLista();
                        $mdToast.cancel();
                        var toast = $mdToast.simple().content('Inclusão do cliente realizada com sucesso!')
                                .action('Fechar')
                                .highlightAction(false)
                                .position('bottom left right');
                        $mdToast.show(toast).then(function () {

                        });
                    }, function () {
                    });
        }

        $scope.dialogAlterarCliente = function (ev, entidade) {
            $mdDialog.show({
                controller: clienteDialogController,
                templateUrl: './app/dialogs/clientes/cliente_dialog.html',
                targetEvent: ev,
                hasBackdrop: true,
                bindToController: true,
                locals: {
                    entidadeExterna: angular.copy(entidade)
                }
            })
                    .then(function (result) {
                        $scope.carregarLista();
                        $mdToast.cancel();
                        var toast = $mdToast.simple()
                                .content('Registro atualizado com sucesso!')
                                .action('Fechar')
                                .highlightAction(false)
                                .position('bottom left right');
                        $mdToast.show(toast).then(function () {

                        });

                        var i = $scope.findByIdInArray($scope.clientes, result);
                        $scope.clientes[i] = result;

                    }, function () {

                    });
        }

        $scope.dialogExcluirCliente = function (ev, lista) {
            var confirm = $mdDialog.confirm()
                    .title('Exclusão de Cliente')
                    .content('Deseja realmente excluir o(s) cliente(s) selecionado(s)? Esta operação não poderá ser desfeita.')
                    .ariaLabel('Exclusão de Cliente')
                    .ok('Sim')
                    .cancel('Cancelar')
                    .targetEvent(ev);
            var listaCopia = angular.copy(lista);

            $mdDialog.show(confirm).then(function () {
                clienteService.remover(lista, {
                    callback: function (result) {
                        $scope.carregarLista();
                        $mdToast.cancel();
                        var toast = $mdToast.simple()
                                .content('Registro(s) excluído(s) com sucesso!')
                                .action('Fechar')
                                .highlightAction(false)
                                .position('bottom left right');
                        $mdToast.show(toast).then(function () {
                        });

                        $scope.limparSelecao();

                        for (var j = 0; j < listaCopia.length; j++) {
                            var i = $scope.findByIdInArray($scope.clientes, listaCopia[j]);
                            $scope.clientes.splice(i, 1);
                        }
                        $scope.$apply();
                    },
                    errorHandler: function (message, exception) {
                        $mdToast.showSimple(message);
                        $log.error("Erro ao excluir registro(s)", message);
                    }
                })
            }, function () {
            });
        }


        $scope.selectionUpdate = function (selectedItens) {

            if ($scope.clientesExcluir.length == 0 && selectedItens.length > 0) {
                $rootScope.$broadcast('showEitsBottomSheetEvent');
            } else if ($scope.clientesExcluir.length > 0 && selectedItens.length == 0) {
                $rootScope.$broadcast('showEitsBottomSheetEvent');
            }

            $scope.clientesExcluir = angular.copy(selectedItens);
        }

        $scope.$watchCollection('selected', function (newValue, oldValue) {
            if (newValue == oldValue)
                return false;
            $scope.selectionUpdate(newValue);
        })

        $scope.limparSelecao = function () {
            $scope.clientesExcluir = [];
            $scope.selected.splice(0, $scope.selected.length);
            $rootScope.$broadcast('showEitsBottomSheetEvent');
        }

        $scope.clienteClicked = function (ev, cliente) {
            $scope.dialogAlterarCliente(ev, cliente);
        };


//Controller do dialog
        function clienteDialogController($scope, $mdDialog, $mdToast, entidadeExterna) {

            if (entidadeExterna != null) {
                $scope.entidade = entidadeExterna;
                $scope.modoAlteracao = true;
            } else {
                $scope.entidade = new Cliente();
                $scope.entidade.totalVendas = 0;
                $scope.modoAlteracao = false;
            }

            $scope.validaForm = function () {
                if (!$scope.clienteForm.$valid) {
                    $mdToast.cancel();
                    $mdToast.show($mdToast.simple()
                            .content('Preencha todos os campos obrigatórios!')
                            .action('Fechar')
                            .highlightAction(false)
                            .position('bottom left right')).then(function () {
                    });

                    return false;
                } else {
                    return true;
                }
            }


            $scope.cancelar = function () {
                $mdDialog.cancel();
            };

            $scope.salvar = function () {
                if ($scope.validaForm()) {
                    clienteService.salvar($scope.entidade, {
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
                                    .position('botttom left right'))
                                    .then(function () {
                                    });
                            $log.error(message);
                        }
                    });
                }

            };

        }


    }]);

