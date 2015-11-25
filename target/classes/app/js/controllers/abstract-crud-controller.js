'use strict';

/**
 *
 * @param $scope
 * @param $log
 * @param $state
 * @param $timeout
 * @param $dialog
 */


app.controller('AbstractCRUDController',['$scope', '$log', '$state', '$rootScope', '$timeout', '$mdDialog', '$mdSidenav',
                                         function($scope, $log, $state, $rootScope, $timeout, $mdDialog, $mdSidenav){
                                             
    $scope.INVALID_FORM_MESSAGE = "Os campos em destaque são de preenchimento obrigatório.";
    $scope.INVALID_ID_MESSAGE = "Não foi possível abrir o detalhe do registro. O identificador é inválido.";
    $scope.ACCESS_DENIED = "Acesso negado ao tentar realizar esta operação. Tente novamente ou contate o administrador do sistema.";

    /*-------------------------------------------------------------------
     *                          EVENT HANDLERS
     *-------------------------------------------------------------------*/
    /**
     * Handler que escuta as mudanças de URLs pertecentes ao estado da tela.
     * Ex.: listar, criar, detalhe, editar
     *
     * Toda vez que ocorre uma mudança de URL se via botão, troca de URL manual, ou ainda
     * ao vançar e voltar do browser, este evento é chamado e chama o initilize() que faz o papel de front-controller.
     *
     */
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.returnLink = null;
        $scope.initialize(toState, toParams, fromState, fromParams);
        $mdSidenav('mainMenu').close();
        $mdDialog.cancel();
    });

    /**
     * Retorna a instancia do form no escopo do angular.
     * @param formName
     * @returns {*|Function|$scope.form|$scope.form|$scope.form|jQuery}
     */
    $scope.form = function (formName) {

        if (!formName) {
            formName = "form";
        }

        return $("form[name=" + formName + "]").scope()[formName];
    };

    /**
     *
     * @param value
     * @param size
     */
    $scope.substr = function (value, size) {
        if (value.length > size) {
            return value.substr(0, size) + "...";
        } else {
            return value;
        }

    }

    /**
     *
     * @param array
     * @param entity
     * @returns {number}
     */
    $scope.findByIdInArray = function (array, entity) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == entity.id) {
                return i;
            }
        }
        return -1;
    }                                     
                                             
                                             
   }
    
    
]);

/*function AbstractCRUDController($scope, $log, $state, $rootScope, $timeout, $mdDialog, $mdSidenav) {

    /*-------------------------------------------------------------------
     *                          ATTRIBUTES
     *-------------------------------------------------------------------*/

   /* $scope.INVALID_FORM_MESSAGE = "Os campos em destaque são de preenchimento obrigatório.";
    $scope.INVALID_ID_MESSAGE = "Não foi possível abrir o detalhe do registro. O identificador é inválido.";
    $scope.ACCESS_DENIED = "Acesso negado ao tentar realizar esta operação. Tente novamente ou contate o administrador do sistema.";*/

    /*-------------------------------------------------------------------
     *                          EVENT HANDLERS
     *-------------------------------------------------------------------*/
    /**
     * Handler que escuta as mudanças de URLs pertecentes ao estado da tela.
     * Ex.: listar, criar, detalhe, editar
     *
     * Toda vez que ocorre uma mudança de URL se via botão, troca de URL manual, ou ainda
     * ao vançar e voltar do browser, este evento é chamado e chama o initilize() que faz o papel de front-controller.
     *
     */
    /*$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.returnLink = null;
        $scope.initialize(toState, toParams, fromState, fromParams);
        $mdSidenav('mainMenu').close();
        $mdDialog.cancel();
    });*/

    /**
     * Retorna a instancia do form no escopo do angular.
     * @param formName
     * @returns {*|Function|$scope.form|$scope.form|$scope.form|jQuery}
     */
    /*$scope.form = function (formName) {

        if (!formName) {
            formName = "form";
        }

        return $("form[name=" + formName + "]").scope()[formName];
    };*/

    /**
     *
     * @param value
     * @param size
     */
    /*$scope.substr = function (value, size) {
        if (value.length > size) {
            return value.substr(0, size) + "...";
        } else {
            return value;
        }

    }*/

    /**
     *
     * @param array
     * @param entity
     * @returns {number}
     */
    /*
    $scope.findByIdInArray = function (array, entity) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == entity.id) {
                return i;
            }
        }
        return -1;
    }
}*/