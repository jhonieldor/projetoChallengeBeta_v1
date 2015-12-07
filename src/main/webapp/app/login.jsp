<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Controle de Vendas</title>
    
        <link rel="stylesheet" href="css/login_style.css">
    
  </head>

  <body>

    <hgroup>
  <h1>Desafio Eits 2015</h1>
  <h3>By Jhoni Eldor Schulz</h3>
</hgroup>
<form name="f" action="<c:url value='/j_spring_security_check' />" method='POST'>
<%-- <form ng-submit="autenticar()"> --%>
  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>	
  <div class="group">
    <input type="text"  name='j_username' required autofocus><span class="highlight"></span><span class="bar"></span>
    <label>Login</label>
  </div>
  <div class="group">
    <input type="password"   name='j_password' required><span class="highlight"></span><span class="bar"></span>
    <label>Senha</label>
  </div>
  
<!--   <td colspan='2'> -->
<!--                 <input name="submit" type="submit"> -->
<!--             </td> -->
  <button type="submit" class="button buttonBlue">Entrar
    <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
  </button>
</form>

	
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

        <script src="js/login_script.js"></script>

<!-- 		<script src="js/angular/angular.js"></script> -->

<!--     	<script src="autenticacao.js"></script> -->
    	
    	 <!-- Scripts -->
    
    
  </body>
</html>
