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
<form>
  <div class="group">
    <input type="text"><span class="highlight"></span><span class="bar"></span>
    <label>Login</label>
  </div>
  <div class="group">
    <input type="password"><span class="highlight"></span><span class="bar"></span>
    <label>Senha</label>
  </div>
  <button type="button" class="button buttonBlue">Entrar
    <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
  </button>
</form>

    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

        <script src="js/login_script.js"></script>

    
    
    
  </body>
</html>
