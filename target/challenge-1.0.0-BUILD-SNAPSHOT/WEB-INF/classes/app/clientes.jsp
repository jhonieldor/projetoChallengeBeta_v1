<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" lang="pt">
<div>  
        <section layout="row" layout-sm="column" layout-align="right" layout-wrap>
            <md-button ng-click="dialogNovoCliente($event)">Novo Cliente</md-button>
            
            <!--<md-button class="md-fab md-accent md-hue-2 grid-add-button" aria-label="Adicionar" ng-click="abrirPopup($event)">
                <i class="md-icon md-icon-add md-icon-lg"></i>
            </md-button>-->
            
            
            
        </section>

</div>    

<div>
<md-content >
    <md-card>
        <md-data-table-toolbar ng-show="!selected.length">
          <h2 class="md-title">Cadastro de Clientes</h2>
        </md-data-table-toolbar>
        
        
        <md-data-table-toolbar class="alternate" ng-show="selected.length" layout="row" layout-align="space-between center" style="padding-left: 95px;" width="100%" height="78">
          <div>{{selected.length}} {{selected.length > 1 ? 'clientes selecionados' : 'cliente selecionado'}}</div>
          
            <md-button class="md-icon-button md-raised" aria-label="Excluir" ng-click="dialogExcluirCliente($event, clientesExcluir)">
                <i class="md-icon-delete md-icon-lg"></i>
            </md-button>
          
          
        </md-data-table-toolbar>
        
        <md-data-table-container>
            <table md-data-table class="md-primary" md-row-select="selected" md-progress="deferred">
                <thead md-order="query.order" md-trigger="onorderchange">
                    <tr>
                        <th order-by="nome" name="Cliente"></th>
                        <th order-by="cidade" name="Cidade"></th>
                        <th order-by="estado" name="Estado"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr  ng-repeat="cliente in clientes | orderBy: query.order | limitTo: query.limit: (query.page -1) *
                                                  query.limit" ng-click="clienteClicked($event, cliente)">
                    
                        <td>{{cliente.nome}}</td>
                        <td>{{cliente.cidade}}</td>
                        <td>{{cliente.uf}}</td>
                    
                    </tr>
                    
                </tbody>
            
            </table>
        </md-data-table-container>
        
        <md-data-table-pagination md-limit="query.limit" md-page="query.page" md-total="{{clientes.count}}" md-trigger="onpagechange"></md-data-table-pagination>
        
    </md-card>
    
        
</md-content>
    
</div>
</html>    



    

