app.controller('ProdutoCtrl',  ['$q', '$scope', '$rootScope', '$mdToast', '$log', '$injector', '$importService', '$mdDialog', '$timeout', function($q, $scope, $rootScope, $mdToast, $log, $injector, $importService, $mdDialog, $timeout) {
    'use strict';
    $importService("produtoService");
    
   
    
    $scope.selected = [];
    $scope.query = {
        order: 'name',
        limit: 10,
        page:1
    }
    
    $scope.produtos = [];
    $scope.produtosExcluir = [];
    
    $scope.carregarLista = function(){
        produtoService.listarProdutos({
            callback: function(result){
                $scope.produtos = result;
                $scope.$apply();
            }, errorHandler: function(a,b){
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
    
    $scope.carregarLista();
    
    $scope.onopenchange = function(page, limit){
        var deferred = $q.defer();
        
        $timeout(function(){
            deferred.resolve();
        }, 1500);
        
        return deferred.promise;
    };
    
    $scope.onorderchange = function(order){
        var deferred = $q.defer();
        
        $timeout(function(){
            deferred.resolve();
        }, 1200);
        
        return deferred.promise;
    };
    
    $scope.dialogNovoProduto = function(ev){
        $mdDialog.show({
            controller: produtoDialogController,
            templateUrl: './app/dialogs/produtos/produto_dialog.html',
            targetEvent: ev,
            hasBackdrop: true,
            locals:{
                entidadeExterna: new Produto()
            }
        })
        
        .then(function(result){
            $scope.carregarLista();
            $mdToast.cancel();
            var toast = $mdToast.simple().content('Inclusão do produto realizada com sucesso!')
            .action('Fechar')
            .highlightAction(false)
            .position('bottom left right');
            $mdToast.show(toast).then(function(){
                
            });
        }, function(){});
    }
    
    $scope.dialogAlterarProduto = function(ev, entidade){
        $mdDialog.show({
            controller: produtoDialogController,
            templateUrl: './app/dialogs/produtos/produto_dialog.html',
            targetEvent: ev,
            hasBackdrop: true,
            bindToController: true,
            locals:{
                entidadeExterna: angular.copy(entidade)
            }
        })
        
        .then(function(result){
            $scope.carregarLista();
            $mdToast.cancel();
            var toast = $mdToast.simple()
                .content('Registro atualizado com sucesso')
                .action('Fechar')
                .highlightAction(false)
                .position('bottom left right');
                $mdTooast.show(toast).then(function(){
                    
                });
            
                var i = $scope.findByIdInArray($scope.produtos, result);    
                $scope.produtos[i] = result;
        }, function(){});
    }
    
    $scope.dialogExcluirProduto = function(ev, lista){
        var confirm = $mdDialog.confirm()
            .title('Exclusão do Produto')
            .content('Deseja realmente excluir o(s) produto(s) selecionado(s)? Esta operação não poderá ser desfeita.')
            .ariaLabel('Exclusão do Produto')
            .ok('Sim')
            .cancel('Cancelar')
            .targetEvent(ev);
            var listaCopia = angular.copy(lista);
        
        $mdDialog.show(confirm).then(function(){
            produtoService.remover(lista,{
                callback: function(result){
                    $scope.carregarLista();
                    $mdToast.cancel();
                    var toast = $mdToast.simple()
                        .content('Registro(s) excluído(s) com sucesso!')
                        .action('Fechar')
                        .highlightAction(false)
                        .position('bottom left right');
                    $mdToast.show(toast).then(function(){});
                    
                    $scope.limparSelecao();
                    
                    for(var j=0; j< listaCopia.length; j++){
                        var i = $scope.findByIdInArray($scope.produtos, listaCopia[j]);
                        $scope.produtos.splice(i,1);
                    }
                    $scope.$apply();
                },
                errorHandler: function(message, exception){
                    $mdToast.showSimple(message);
                    $log.error("Erro ao excluir registro(s)", message);
                }
            })
        }, function(){});   
    }
    
    $scope.selectionUpdate = function(selectedItens){
        if($scope.produtosExcluir.length == 0 && selectedItens.length > 0){
            $rootScope.$broadcast('showEitsBottomSheetEvent');
        }else if($scope.produtosExcluir.length > 0 && selectedItens.length==0){ 
            $rootScope.$broadcast('showEitsBottomSheetEvent');
        }
        
        $scope.produtosExcluir = angular.copy(selectedItens);
    }
    
    $scope.$watchCollection('selected', function(newValue, oldValue){
        if(newValue==oldValue) return false;
        $scope.selectionUpdate(newValue);
    })
    
    $scope.limparSelecao = function(){
        $scope.produtosExcluir = [];
        $scope.selected.splice(0, $scope.selected.length);
        $rootScope.$broadcast('showEitsBottomSheetEvent');
    }
    
    $scope.produtoClicked = function (ev, produto) {
        $scope.dialogAlterarProduto(ev, produto);
    };   
    
    //Controller do Dialog
    function produtoDialogController($scope, $mdDialog, $mdToast, entidadeExterna){
        if(entidadeExterna != null){
            $scope.entidade = entidadeExterna;
            $scope.modoAlteracao = true;
        } else {
            $scope.entidade = new Produto();
            $scope.modoAlteracao = false;
        }
        
        $scope.validaForm = function(){
            if(!$scope.produtoForm.$valid){
                $mdToast.cancel();
                $mdToast.show($mdToast.simple()
                             .content('Preencha todos os campos obrigatórios')
                             .action('Fechar')
                             .highlightAction(false)
                             .position('bottom left right')).then(function (){
                    
                });
                return false;
            } else{
                return true;
            }
        }
        
        $scope.cancelar = function(){
            $mdDialog.cancel();
        };
        
        $scope.salvar = function(){
            if($scope.validaForm()){
                produtoService.salvar($scope.entidade,{
                    callback: function(result){
                        $mdDialog.hide(result);
                        $scope.$apply();
                    },
                    errorHandler: function(message, error){
                        $mdToast.cancel();
                        $mdToast.show($mdToast.simple()
                                     .content(message)
                                     .action('Fechar')
                                     .highlightAction(false)
                                     .position('bottom left right'))
                                     .then(function(){});
                                     $log.error(message);
                                     
                    }
                });
            }
        };
    }
    
    
}]);