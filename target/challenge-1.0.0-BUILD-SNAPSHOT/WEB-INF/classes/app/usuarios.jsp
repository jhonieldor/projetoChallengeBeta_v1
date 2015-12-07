<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" lang="pt">
    <div>  
        <section layout="row" layout-sm="column" layout-align="right" layout-wrap>
            <md-button class="md-raised" ng-click="dialogNovoUsuario($event)">Novo Usuário</md-button>
        </section>

    </div>    

    <div>
        <md-content>
            <md-card>
                <md-data-table-toolbar ng-show="!selected.length">
                    <h2 class="md-title">Controle de Usuários</h2>
                </md-data-table-toolbar>

                <md-data-table-container>
                    <table md-data-table class="md-primary"  md-progress="deferred">
                        <thead md-order="query.order" md-trigger="onorderchange">
                            <tr>
                                <th order-by="login" name="Login"></th>
                                <th order-by="email" name="Email"></th>
                                <th order-by="perfil" name="Perfil"></th>
                                <th order-by="status" name="Status"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="usuario in usuarios| orderBy: query.order | limitTo: query.limit: (query.page -1) *
                                                  query.limit" ng-click="usuarioClicked($event, usuario)">

                                <td>{{usuario.login}}</td>
                                <td>{{usuario.email}}</td>
                                <td>{{usuario.perfil}}</td>

                                <td>
                                    <md-button ng-show="!usuario.ativo" class="md-raised md-warn" ng-click="dialogAtivarUsuario($event, usuario)"> Ativar </md-button> 
                                    <md-button ng-show="usuario.ativo" class="alternate md-raised md-primary" ng-click="dialogDesativarUsuario($event, usuario)"> Desativar </md-button>
                                </td>

                        </tr>

                        </tbody>

                    </table>
                </md-data-table-container>

                <md-data-table-pagination md-limit="query.limit" md-page="query.page" md-total="{{usuarios.length}}" md-trigger="onpagechange"></md-data-table-pagination>

            </md-card>


        </md-content>

    </div>
</html>    





