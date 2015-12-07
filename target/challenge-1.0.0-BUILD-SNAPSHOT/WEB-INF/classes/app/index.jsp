<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <title>Controle de Vendas</title>
        <!-- <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/0.11.2/angular-material.min.css">
        <link rel="stylesheet" type="text/css" href="js/md-data-table/md-data-table.css">
        <link rel="stylesheet" href="css/style.css"> -->



        <!-- Custom Directive -->
        <!--  <script type="text/javascript" src="./js/eits-bottomsheet/eits-bottomsheet.js"></script>
        <script type="text/javascript" src="./js/numbers-only/numbers-only.js"></script>
        <script type="text/javascript" src="./js/currency/currency-directive.js"></script>-->


    </head>

    <body layout="column" ng-controller="AppCtrl">

    <md-toolbar layout="row">
        <div class="md-toolbar-tools">
            <md-button ng-click="toggleSidenav('left')" hide-gt-sm

                       class="md-icon-button"> <md-icon aria-label="Menu"
                                             md-svg-icon="https://s3-us-west-2.amazonaws.com/s.cdpn.io/68133/menu.svg"></md-icon>
            </md-button>
            Controle de Vendas
        </div>
    </md-toolbar>
    <div layout="row" flex>
        <md-sidenav ng-if="$root.mainMenu"  layout="column" class="md-sidenav-left md-whiteframe-z2"
                    md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')">
            <div>
                <md-content layout="column"> 
                    <md-button  href="#/clientes">
                        Clientes 
                    </md-button>

                    <md-button  href="#/produtos">
                        Produtos
                    </md-button >

                    <md-button href="#/vendas">
                        Vendas
                    </md-button>
                    <sec:authorize access="hasAuthority('ROLE_ADMIN')">
                        <md-button href="#/usuarios">
                            Usuários
                        </md-button>
                    </sec:authorize>

                </md-content>
            </div>

        </md-sidenav>

        <div ng-view layout-fill>
        </div>


    </div>

    <!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-route.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-animate.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-aria.min.js"></script> -->


    <!-- Angular Material Javascript now available via Google CDN; version 0.11.2 used here-->
    <!--<script src="https://ajax.googleapis.com/ajax/libs/angular_material/0.11.2/angular-material.min.js"></script>-->
    <script src="./app/js/md-data-table/md-data-table.js"></script> 

    <!-- Styles -->
    <jsp:include page="default-styles.jsp"/>

    <!-- Scripts -->
    <jsp:include page="default-scripts.jsp"/>


    <!-- Controllers -->
    <script src="./app/appMain.js"></script>    
    <script src="./app/js/controllers/abstract-crud-controller.js"></script>
    <script src="./app/js/controllers/clienteController.js"></script>    
    <script src="./app/js/controllers/produtoController.js"></script>
    <script src="./app/js/controllers/usuarioController.js"></script>    
    <script src="./app/js/controllers/vendaController.js"></script>
    <script src="./app/js/controllers/lancamentoVendaController.js"></script>    


</body>

</html>