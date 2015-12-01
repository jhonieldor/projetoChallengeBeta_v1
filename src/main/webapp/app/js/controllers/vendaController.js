app.controller('VendaCtrl', ['$q', '$scope', '$rootScope', '$mdToast', '$log', '$injector', '$importService', '$mdDialog', '$timeout', '$location',
    '$routeParams',
    function ($q, $scope, $rootScope, $mdToast, $log, $injector, $importService, $mdDialog, $timeout, $location, $routeParams) {
        $importService("vendaService");
        $scope.selected = [];

        var self = this;

        $scope.venda = new Venda();
        $scope.venda.valorTotal = 0;
        $scope.venda.dataVenda = new Date();
        $scope.venda.cliente = null;


        $scope.produtoVendaClicked = function (ev, produtoVenda) {
            $scope.dialogAlterarProduto(ev, produtoVenda);
        }

        $scope.carregarVenda = function (ev, venda) {
            $rootScope.mainMenu = false;
            $location.path('/lancamento_vendas/' + venda.id);
        };


        $scope.lancarVendas = function () {
            $location.path('/lancamento_vendas');
            $rootScope.mainMenu = false;
        }

        $scope.buscarVenda = function (id) {
            vendaService.buscarVenda(id, {
                callback: function (result) {
                    $scope.venda = result;
                    $scope.carregarProdutosVenda(result);
                    $scope.$apply();
                }, errorHandler: function (a, b) {
                    console.log(a);
                }
            })
        };


        var path = '/lancamento_vendas/' + $routeParams.id;
        if (($location.path() == '/lancamento_vendas') || ($location.path() == path)) {
            $rootScope.mainMenu = false;
            $scope.buscarVenda($routeParams.id);
        } else {
            $rootScope.mainMenu = true;
        }
        ;

        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        }

        /*$scope.venda = {
         dataVenda: '',
         valorTotal: null
         };*/
        $scope.searchTextCliente = null;
        $scope.clientes = [];

        $scope.vendas = [];
        $scope.produtosVenda = [];
        $scope.vendasSelecionadas = [];
        $scope.produtosVendaSelecionados = [];
        $scope.produtosExcluir = [];
        $scope.produtoSelecionado = null;
        $scope.totalVendas = 0;


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

        $scope.buscarClientes();

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (angular.lowercase(state.nome).search(lowercaseQuery) != -1);
            };
        }

        $scope.querySearchForClientes = function (query) {
            return query ? $scope.clientes.filter(createFilterFor(query)) : $scope.clientes;
        }

        $scope.buscarProdutos = function () {
            vendaService.buscarProdutos({
                callback: function (result) {
                    $scope.produtos = result;
                    $scope.$apply();
                }, errorHandler: function (a, b) {
                    console.log(a)
                }
            })
        }

        $scope.vendaClicked = function (ev, venda) {
            $scope.carregarVenda(ev, venda);
        };


        $scope.carregarVendas = function () {
            vendaService.listarVendas({
                callback: function (result) {
                    $scope.vendas = result;
                    $scope.processarTotalVendas();
                    $scope.$apply();
                }, errorHandler: function (a, b) {
                    console.log(a);
                }
            });
        };

        $scope.processarTotalVendas = function () {
            $scope.totalVendas = 0;
            for (var i = 0; i < $scope.vendas.length; i++) {
                if (!$scope.vendas[i].estornada) {
                    $scope.totalVendas = $scope.totalVendas + $scope.vendas[i].valorTotal;
                }
            }
        }


        $scope.recalcularTotal = function () {
            $scope.valor = 0;
            for (var i = 0; i < $scope.produtosVenda.length; i++) {
                $scope.valor = $scope.valor + $scope.produtosVenda[i].valor;
            }
            $scope.venda.valorTotal = $scope.valor;
        }


        $scope.carregarProdutosVenda = function (venda) {
            vendaService.listarProdutosVenda(venda, {
                callback: function (result) {
                    $scope.produtosVenda = result;
                    $scope.$apply();
                },
                errorHandler: function (message, exception) {
                    $log.error(message);
                }
            });
            //processarTotalVendas();
        }

        $scope.dialogAddProdutoVenda = function (ev) {
            $mdDialog.show({
                controller: produtoVendaDialogController,
                templateUrl: './app/dialogs/vendas/produtoVenda_dialog.html',
                targetEvent: ev,
                hasBackdrop: true,
                locals: {
                    entidadeExterna: new ProdutoVenda(),
                }
            })

                    .then(function (result) {
                        $mdToast.cancel();
                        $scope.produtosVenda.push(result);
                        $scope.valor = 0;
                        $scope.recalcularTotal();

                        var toast = $mdToast.simple().content('Inclusão do produto realizada com sucesso!')
                                .action('Fechar')
                                .highlightAction(false)
                                .position('bottom left right');
                        $mdToast.show(toast).then(function () {
                        });
                    }, function () {
                    });
        }


        $scope.dialogAlterarProduto = function (ev, entidade) {
            $mdDialog.show({
                controller: produtoVendaDialogController,
                templateUrl: './app/dialogs/vendas/updateProdutoVenda.html',
                targetEvent: ev,
                hasBackdrop: true,
                locals: {
                    entidadeExterna: entidade,
                }

            })

                    .then(function (result) {
                        $mdToast.cancel();
                        $scope.recalcularTotal();

                        var toast = $mdToast.simple()
                                .content('Alteração do produto realizada com sucesso!')
                                .action('Fechar')
                                .highlightAction(false).position('bottom left right');
                        $mdToast.show(toast).then(function () {
                        });

                    }, function () {
                    });
        }

        $scope.dialogExcluirProduto = function (ev, lista) {
            var confirm = $mdDialog.confirm()
                    .title('Exclusão do Produto')
                    .content('Deseja realmente remover o(s) produto(s) da venda?')
                    .ariaLabel('Exclusão do Produto')
                    .ok('Sim')
                    .cancel('Cancelar')
                    .targetEvent(ev);

            var listaCopia = angular.copy(lista);

            $mdDialog.show(confirm).then(function () {
                $mdToast.cancel();
                $scope.recalcularTotal();
                var toast = $mdToast.simple()
                        .content('Registro(s) excluído(s) com sucesso!')
                        .action('Fechar')
                        .highlightAction(false)
                        .position('bottom left right');
                $mdToast.show(toast).then(function () {
                });

                $scope.limparSelecao();

                for (var j = 0; j < listaCopia.length; j++) {
                    var i = $scope.findProdutoByIdInArray($scope.produtosVenda, listaCopia[j]);
                    $scope.venda.valorTotal = $scope.venda.valorTotal - $scope.produtosVenda[i].valor;
                    $scope.produtosVenda.splice(i, 1);
                }
            }, function () {
            });
        }


        $scope.selectionUpdate = function (selectedItens) {
            if ($scope.produtosExcluir.length == 0 && selectedItens.length > 0) {
                $rootScope.$broadcast('showEitsBottomSheetEvent');
            } else if ($scope.produtosExcluir.length > 0 && selectedItens.length == 0) {
                $rootScope.$broadcast('showEitsBottomSheetEvent');
            }

            $scope.produtosExcluir = angular.copy(selectedItens);
        }

        $scope.$watchCollection('produtosVendaSelecionados', function (newValue, oldValue) {
            if (newValue == oldValue)
                return false;
            $scope.selectionUpdate(newValue);
        })

        $scope.limparSelecao = function () {
            $scope.produtosExcluir = [];
            $scope.produtosVendaSelecionados.splice(0, $scope.produtosVendaSelecionados.length);
            $rootScope.$broadcast('showEitsBottomSheetEvent');
        }

        $scope.findByIdInArray = function (array, entity) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == entity.id) {
                    return i;
                }
            }
            return -1;
        };


        $scope.findProdutoByIdInArray = function (array, entity) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].produto.id == entity.produto.id) {
                    return i;
                }
            }
            return -1;
        };

        $scope.estornarVenda = function (venda) {
            vendaService.estornarVenda(venda, {
                callback: function (result) {
                    $scope.carregarVendas();
                    $scope.processarTotalVendas();
                    $mdToast.cancel();
                    var toast = $mdToast.simple()
                            .content('Estorno de venda realizado com sucesso!')
                            .action('Fechar')
                            .highlightAction(false)
                            .position('bottom left right');
                    $mdToast.show(toast).then(function () {
                    });

                    $scope.$apply();
                },
                errorHandler: function (message, exception) {
                    $mdToast.showSimple(message);
                    $log.error("Erro ao estornar a venda", message);
                }
            })

        };
        
        
        $scope.relancarVenda = function (venda) {
            vendaService.relancarVenda(venda, {
                callback: function (result) {
                    $scope.carregarVendas();
                    $scope.processarTotalVendas();
                    $mdToast.cancel();
                    var toast = $mdToast.simple()
                            .content('Relançamento de venda realizado com sucesso!')
                            .action('Fechar')
                            .highlightAction(false)
                            .position('bottom left right');
                    $mdToast.show(toast).then(function () {
                    });

                    $scope.$apply();
                },
                errorHandler: function (message, exception) {
                    $mdToast.showSimple(message);
                    $log.error("Erro ao relançar a venda", message);
                }
            })

        };
        


        $scope.dialogCancelarVenda = function (ev) {
            var confirm = $mdDialog.confirm()
                    .title('Cancelar o Lançamento de Venda')
                    .content('Ao cancelar este lançamento todos os dados da venda serão perdidos. Deseja prosseguir?')
                    .ariaLabel('Cancelar Lançamento de Venda')
                    .ok('Sim')
                    .cancel('Cancelar')
                    .targetEvent(ev);

            $mdDialog.show(confirm).then(function () {
                $scope.produtosVenda = null;
                $scope.cliente = null;
                $scope.venda.valorTotal = 0;
                $scope.cancelarVenda();
                $mdDialog.hide();
            });
        }

        $scope.dialogEstornarVenda = function (ev, venda) {
            var confirm = $mdDialog.confirm()
                    .title('Estornar Venda')
                    .content('Deseja realmente estornar a venda selecionada? Esta operação irá estornar o saldo de estoque dos produtos vinculados.')
                    .ariaLabel('Estornar Venda')
                    .ok('Sim')
                    .cancel('Cancelar')
                    .targetEvent(ev);

            $mdDialog.show(confirm).then(function () {
                $scope.estornarVenda(venda);
                $mdDialog.hide();
            });
        }
        
        $scope.dialogRelancarVenda = function (ev, venda) {
            var confirm = $mdDialog.confirm()
                    .title('Relançar Venda')
                    .content('Esta operação irá cancelar o estorno da venda, e a venda poderá ser lançada novamente! Deseja prosseguir?')
                    .ariaLabel('Relançar Venda')
                    .ok('Sim')
                    .cancel('Cancelar')
                    .targetEvent(ev);

            $mdDialog.show(confirm).then(function () {
                $scope.relancarVenda(venda);
                $mdDialog.hide();
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



        $scope.salvarVenda = function () {
            vendaService.salvarVenda($scope.venda, {
                callback: function (result) {
                    $mdDialog.hide(result);
                    $scope.salvarProdutos();
                    $scope.carregarVendas();
                    $scope.processarTotalVendas();
                    $scope.$apply();

                    $location.path('/vendas');
                    $rootScope.mainMenu = true;

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


        $scope.salvarProdutos = function () {
            vendaService.salvarProdutos($scope.produtosVenda, {
                callback: function (result) {
                    $mdDialog.hide(result);
                    $scope.$apply();

                    $mdToast.cancel();
                    var toast = $mdToast.simple().content('Lançamento de venda realizado com sucesso!')
                            .action('Fechar')
                            .highlightAction(false)
                            .position('bottom left right');
                    $mdToast.show(toast).then(function () {
                    });

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



        $scope.cancelarVenda = function () {
            $location.path('/vendas');
            $rootScope.mainMenu = true;
        }

        function produtoVendaDialogController($scope, $mdDialog, $mdToast, $importService, entidadeExterna) {
            $scope.searchTextProduto = null;
            $scope.produtos = [];
            $scope.quantidade = 1;

            $importService("vendaService");

            $scope.buscarProdutos = function () {
                vendaService.buscarProdutos({
                    callback: function (result) {
                        $scope.produtos = result;
                        $scope.$apply();
                    }, errorHandler: function (a, b) {
                        console.log(a)
                    }
                })
            }

            if (entidadeExterna != null) {
                $scope.entidade = entidadeExterna;
                $scope.modoAlteracao = true;
            } else {
                $scope.entidade = new ProdutoVenda();
                $scope.modoAlteracao = false;
            }

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(state) {
                    return (angular.lowercase(state.descricao).search(lowercaseQuery) != -1);
                };
            }

            $scope.querySearchForProdutos = function (query) {
                return query ? $scope.produtos.filter(createFilterFor(query)) : $scope.produtos;
            }

            $scope.validaForm = function () {
                if (!$scope.produtoVendaForm.$valid) {
                    $mdToast.cancel();
                    $mdToast.show($mdToast.simple()
                            .content('Preencha todos os campos obrigat�rios')
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
                $scope.entidade.produto = $scope.produtoSelecionado;
                $scope.entidade.quantidade = $scope.quantidade;
                $scope.entidade.valor = $scope.quantidade * $scope.produtoSelecionado.valorUnitario;

                $mdDialog.hide($scope.entidade);
            }

            $scope.atualizar = function () {
                $scope.entidade.valor = $scope.entidade.quantidade * $scope.entidade.produto.valorUnitario;
                $mdDialog.hide($scope.entidade);
            }

        }



    }]);