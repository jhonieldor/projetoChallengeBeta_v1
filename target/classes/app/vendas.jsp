<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" lang="pt">    
    
<div>  
        <section layout="row" layout-sm="column" layout-align="right" layout-wrap>
            <md-button href="#/lancamento_vendas" ng-click="lancarVendas()">Lançar Venda</md-button>
            
            <!--<md-button class="md-fab md-accent md-hue-2 grid-add-button" aria-label="Adicionar" ng-click="abrirPopup($event)">
                <i class="md-icon md-icon-add md-icon-lg"></i>
            </md-button>-->
            
            
            
        </section>

</div>    

<div>
<md-content >
    <md-card>
        <md-data-table-toolbar ng-show="!selected.length">
          <h2 class="md-title">Lançamento de Vendas</h2>
        </md-data-table-toolbar>
        
        
        <md-data-table-toolbar class="alternate" ng-show="selected.length">
          <div>{{selected.length}} {{selected.length > 1 ? 'produtos selecionados' : 'produto selecionado'}}</div>
        </md-data-table-toolbar>
        
        <md-data-table-container>
            <table md-data-table class="md-primary" md-row-select="selected" md-progress="deferred">
                <thead md-order="query.order" md-trigger="onorderchange">
                    <tr>
                        <th order-by="descricao" name="Cliente"></th>
                        <th order-by="marca" name="Cidade"></th>
                        <th order-by="valor" name="Valor"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr md-auto-select ng-repeat="produto in produtos | orderBy: query.order | limitTo: query.limit: (query.page -1) *
                                                  query.limit">
                    
                        <td>{{produto.descricao}}</td>
                        <td>{{produto.marca}}</td>
                        <td>{{produto.valor}}</td>
                    
                    </tr>
                    
                </tbody>
            
            </table>
        </md-data-table-container>
        
        <md-data-table-pagination md-limit="query.limit" md-page="query.page" md-total="{{produtos.count}}" md-trigger="onpagechange"></md-data-table-pagination>
        
    </md-card>
    
        
</md-content>
    
</div>  
</html>



    

