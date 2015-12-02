<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" lang="pt">    

    <div>  
        <section layout="row" layout-sm="column" layout-align="right" layout-wrap>
            <md-button class="md-raised"  ng-click="lancarVendas()">Lançar Venda</md-button>

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
                    <table md-data-table class="md-primary"  md-progress="deferred" ng-init="carregarVendas()">
                        <thead md-order="query.order" md-trigger="onorderchange">
                            <tr>
                                <th order-by="cliente" name="Cliente"></th>
                                <th order-by="valorTotal" name="Valor Total"></th>
                                <th order-by="data" name="Data da Venda"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-disabled="venda.estornada" md-auto-select ng-repeat="venda in vendas| orderBy: query.order | limitTo: query.limit: (query.page -1) *
                                                  query.limit" >

                                <td>{{venda.cliente.nome}}</td>
                                <td>{{venda.valorTotal| currency: 'R$ '}}</td>
                                <td>{{venda.dataVenda| date:'dd/MM/yyyy  h:mma'}}</td>
                                <td> <md-button  ng-disabled="venda.estornada" class="md-raised" ng-click="vendaClicked($event, venda)"> Alterar </md-button> </td>
                        <td>
                        <md-button ng-show="!venda.estornada" class="md-raised md-warn" ng-click="dialogEstornarVenda($event, venda)"> Estornar </md-button> 
                        <md-button ng-show="venda.estornada" class="alternate md-raised md-primary" ng-click="dialogRelancarVenda($event, venda)"> Relançar </md-button>
                        </td>


                        </tr>

                        </tbody>

                    </table>
                </md-data-table-container>

                <md-data-table-pagination md-limit="query.limit" md-page="query.page" md-total="{{vendas.length}}" md-trigger="onpagechange"></md-data-table-pagination>

            </md-card>

            <md-content >
                <md-card>
                    <md-data-table-toolbar>
                        <h2 class="md-title"> Total:  </h2>
                        <h2 class="md-title" > {{ (totalVendas | currency: ' R$ ')}} </h2> 
                    </md-data-table-toolbar> 
                </md-card>
            </md-content>
        </md-content>

    </div>  
</html>





