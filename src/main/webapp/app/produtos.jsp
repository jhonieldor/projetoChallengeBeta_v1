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
            <md-button class="md-raised" ng-click="dialogNovoProduto($event)">Novo Produto</md-button>

        </section>

        <md-content >
            <md-card>
                <md-data-table-toolbar ng-show="!selected.length">
                    <h2 class="md-title">Cadastro de Produtos</h2>
                </md-data-table-toolbar>


                <md-data-table-toolbar class="alternate" ng-show="selected.length" layout="row" layout-align="space-between center" style="padding-left: 95px;" width="100%" height="78">
                    <div>{{selected.length}} {{selected.length > 1 ? 'produtos selecionados' : 'produto selecionado'}}</div>

                    <md-button class="md-icon-button md-raised" aria-label="Excluir" ng-click="dialogExcluirProduto($event, produtosExcluir)">
                        <i class="md-icon-delete md-icon-lg"></i>
                    </md-button>
                </md-data-table-toolbar>

                <md-data-table-container>
                    <table md-data-table class="md-primary" md-row-select="selected" md-progress="deferred">
                        <thead md-order="query.order" md-trigger="onorderchange">
                            <tr>
                                <th order-by="descricao" name="Descrição"></th>
                                <th order-by="marca" name="Marca"></th>
                                <th order-by="valor" name="Valor"></th>
                                 <th order-by="saldo" name="Saldo de Estoque"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr md-disable-select="produto.produtoVendido" ng-repeat="produto in produtos track by $index| orderBy: query.order | limitTo: query.limit: (query.page -1) *
                                                  query.limit" ng-click="produtoClicked($event, produto)">

                                <td>{{produto.descricao}}</td>
                                <td>{{produto.marca}}</td>
                                <td>{{produto.valorUnitario | currency : ' R$ ' }}</td>
                                <td>{{produto.saldoEstoque}}</td>
                            </tr>

                        </tbody>

                    </table>
                </md-data-table-container>

                <md-data-table-pagination md-limit="query.limit" md-page="query.page" md-total="{{produtos.count}}" md-trigger="onpagechange"></md-data-table-pagination> 

            </md-card>


        </md-content>
    </div>    
    <div>


    </div>

</html>




