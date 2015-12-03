app.controller('UsuarioCtrl', ['$q', '$scope', '$rootScope', '$mdToast', '$log', '$injector', '$importService', '$mdDialog', '$timeout', function ($q, $scope, $rootScope, $mdToast, $log, $injector, $importService, $mdDialog, $timeout) {
        'use strict'
        $importService("usuarioService");
        $scope.selected = [];
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        }

        $scope.usuarios = [];
        $scope.usuariosDesativar = [];
        
        $scope.perfis = ('Administrador', 'Usuario');
        $scope.tipoPerfil = null;
        
        $scope.findByIdInArray = function (array, entity) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == entity.id) {
                    return i;
                }
            }
            return -1;
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
        $scope.dialogNovoUsuario = function (ev) {
            $mdDialog.show({
                controller: usuarioDialogController,
                templateUrl: './app/dialogs/usuarios/usuario_dialog.html',
                targetEvent: ev,
                hasBackdrop: true,
                locals: {
                    entidadeExterna: new Usuario()
                }
            })

                    .then(function (result) {
                        $scope.carregarLista();
                        $mdToast.cancel();
                        var toast = $mdToast.simple().content('Inclusão do produto realizada com sucesso!')
                                .action('Fechar')
                                .highlightAction(false)
                                .position('bottom left right');
                        $mdToast.show(toast).then(function () {

                        });
                    }, function () {
                    });
        }

        $scope.dialogAlterarUsuario = function (ev, entidade) {
            $mdDialog.show({
                controller: usuarioDialogController,
                templateUrl: './app/dialogs/usuarios/usuario_dialog.html',
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
                                .content('Registro atualizado com sucesso')
                                .action('Fechar')
                                .highlightAction(false)
                                .position('bottom left right');
                        $mdToast.show(toast).then(function () {

                        });
                        var i = $scope.findByIdInArray($scope.produtos, result);
                        $scope.produtos[i] = result;
                    }, function () {
                    });
        }

        $scope.dialogDesativarUsuario = function (ev, usuario) {
            var confirm = $mdDialog.confirm()
                    .title('Desativação de Usuário')
                    .content('Deseja realmente desativar o usuário selecionado?')
                    .ariaLabel('Desativação do Usuário')
                    .ok('Sim')
                    .cancel('Cancelar')
                    .targetEvent(ev);
            $mdDialog.show(confirm).then(function () {
                usuarioService.desativarUsuario(usuario, {
                    callback: function (result) {
                        $mdToast.cacel();
                        var toast = $mdToast.simple()
                                .content('Desativação do usuário realizada com sucesso!')
                                .action('Fechar')
                                .highlightAction(false)
                                .position('bottom left right');
                        $mdToast.show(toast).then(function () {
                        });
                        $scope.apply();
                    },
                    errorHandler: function (message, exception) {
                        $mdToast.showSimple(message);
                        $log.error("Erro ocorrido na desativação do usuário", message);
                    }
                })
            }, function () {
            });
        }

        $scope.usuarioClicked = function (ev, usuario) {
            $scope.dialogAlterarUsuario(ev, usuario);
        };
        
        function usuarioDialogController($scope, $mdDialog, $mdToast, entidadeExterna) {
            if (entidadeExterna != null) {
                $scope.entidade = entidadeExterna;
                $scope.modoAlteracao = true;
            } else {
                $scope.entidade = new Usuario();
                $scope.modoAlteracao = false;
            }

            $scope.validaForm = function () {
                if (!$scope.usuarioForm.$valid) {
                    $mdToast.cancel();
                    $mdToast.shwo($mdToast.simple()
                            .content('Preencha todos os campos ')
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
                    usuarioService.salvarUsuario($scope.entidade, {
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