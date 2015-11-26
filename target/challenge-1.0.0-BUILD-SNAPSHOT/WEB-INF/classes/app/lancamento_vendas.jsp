<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" lang="pt">
    <div >


        <md-content>
            <form name="formVenda">
                <md-card>
                    <md-content>
                        <md-data-table-toolbar>
                            <h2 class="md-title"> Dados da Venda </h2>
                        </md-data-table-toolbar>


                        <div layout layout-sm="column">
                            <md-input-container style="width: 500px">
                                <label>Cliente</label>
                                <input >
                            </md-input-container>
                            <md-datepicker ng-model="venda.dataVenda" md-placeholder="Data da Venda"></md-datepicker>
                        </div>
                    </md-content>
                </md-card>


            </form>
        </md-content>

        <md-content>
            <section layout="row" layout-sm="column" layout-align="right" layout-wrap>
                <md-button ng-click="dialogAddProdutoVenda($event)">Adicionar Produto</md-button>
            </section>

            <md-card>

                <md-data-table-toolbar ng-show="!selected.length">
                    <h3 class="md-title">Produtos da Venda</h3>
                </md-data-table-toolbar>


                <md-data-table-toolbar class="alternate" ng-show="produtosVendaSeleciondaos.length" layout="row" layout-align="space-between center"
                                       style="padding-left: 95px;" width="100%" heignt = "78">
                    <div>{{produtosVendaSelecionados.length}} {{produtosVendaSelecionados.length> 1 ? 'produtos selecionados' : 'produto selecionado'}}</div>

                    <md-button class="md-icon-button md-raised" aria-label="Excluir" >
                        <i clas="md-icon-delete md-icon-lg"></i>
                    </md-button>

                </md-data-table-toolbar>

                <md-data-table-container>
                    <table md-data-table class="md-primary" md-progress="deferred">
                        <thead md-order="query.order" md-trigger="onorderchange">
                            <tr>
                                <th order-by="produto" name="Produto"></th>
                                <th order-by="valorUnitario" name="Valor Unit."></th>
                                <th order-by="quantidade" name="Quantidade"></th>
                                <th order-by="valorTotal" name="Valor Total"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="produtoVenda in produtosVenda">
                                <td> {{produtoVenda.produto.descricao}} </td>
                                <td> {{produtoVenda.produto.valorUnitario}}</td>
                                <td>{{produtoVenda.quantidade}}</td>
                                <td>{{produtoVenda.valorTotal}}</td>
                            </tr>
                        </tbody>
                    </table>
                </md-data-table-container>

                <md-data-table-pagination md-limit="query.limit" md-page="query.page" md-total="{{produtos.count}}" md-trigger="onpagechange"></md-data-table-pagination>

            </md-card>

        </md-content>

        <md-content>
            <md-card>
                <md-data-table-toolbar>
                    <h2 class="md-title"> Total da Venda :  </h2>
                    <h2 class="md-title" >  R$ 500,00 </h2>
                </md-data-table-toolbar> 
            </md-card>
        </md-content>

        <md-content>
            <section layout="row" layout-sm="column" layout-align="right" layout-wrap>      
                <md-button href="#/vendas" ng-click="salvarVenda()"  class="md-primary">
                    Salvar
                </md-button>

                <md-button ng-click="cancelarVenda()" >
                    Cancelar
                </md-button>

            </section>    
        </md-content>
    </div>



</html>