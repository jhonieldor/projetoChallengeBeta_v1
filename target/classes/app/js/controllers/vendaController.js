app.controller('VendaCtrl',  ['$q', '$scope', '$mdDialog', '$timeout', function($q, $scope, $mdDialog, $timeout) {
    $scope.LIST_STATE = "vendas.listar";
    $scope.INSERT_STATE = "vendas.criar";
    $scope.UPDATE_STATE = "vendas.editar";
    
    $scope.selected = [];
    $scope.query = {
        order: 'name',
        limit: 5,
        page:1
    }
    
    $scope.vendas = [];
    
    
    
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
    
    $scope.lancarVendas = function(){
    	$scope.mainMenu = false;
    }
    
    
    
}]);