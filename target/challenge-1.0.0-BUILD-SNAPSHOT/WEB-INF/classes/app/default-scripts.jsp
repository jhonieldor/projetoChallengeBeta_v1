<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- JQuery -->
<script type="text/javascript" src="./webjars/jquery/2.1.4/jquery.min.js"></script>

<!-- AngularJS -->
<script type="text/javascript" src="./webjars/angularjs/1.4.3-1/angular.js"></script>
<script type="text/javascript" src="./webjars/angularjs/1.4.3-1/i18n/angular-locale_pt-br.js"></script>
<script type="text/javascript" src="./webjars/angular-messages/1.3.15/angular-messages.min.js"></script>
<script type="text/javascript" src="./webjars/angularjs/1.4.3-1/angular-animate.min.js"></script>
<script type="text/javascript" src="./webjars/angularjs/1.4.3-1/angular-route.js"></script>    
<script type="text/javascript" src="./webjars/angularjs/1.4.3-1/angular-aria.min.js"></script>
<script type="text/javascript" src="./webjars/angular-material/0.11.0/angular-material.min.js"/></script>
<!-- <script type="text/javascript" src="https://gitcdn.xyz/repo/angular/bower-material/v0.10.1-rc5/angular-material.js"></script>  -->
<!--<script type="text/javascript" src="./webjars/angular-ui-router/<spring:eval expression="@environment.getProperty('uirouter.version')"/>/angular-ui-router.min.js"></script>-->

    
 <!--froala HTML editor 
<script type="text/javascript" src="./static/js/froala-editor/froala_editor.min.js?v=${version}"></script>
<script type="text/javascript" src="./static/js/froala-editor/froala-sanitize.js?v=${version}"></script>
<script type="text/javascript" src="./static/js/froala-editor/langs/pt_br.js?v=${version}"></script>
<script type="text/javascript" src="./static/js/froala-editor/angular-froala.js?v=${version}"></script>-->

<!-- DWR -->
<script type="text/javascript" src="/challenge/dwr/engine.js"/></script>
<script type="text/javascript" src="/challenge/dwr/util.js"/></script>

<!-- Custom Directive -->
<script type="text/javascript" src="./app/js/eits-bottomsheet/eits-bottomsheet.js"></script>


<script type="text/javascript" src="./app/js/md-data-table/md-data-table.js"></script>

<!-- EITS -->
<script type="text/javascript" src="./webjars/eits/1.0.3-SNAPSHOT/broker/dwr-broker.js"/></script>
<script type="text/javascript" src="./webjars/eits-md/1.0.3-SNAPSHOT/controls/table/table.js"/></script>
<script type="text/javascript" src="./webjars/eits-md/1.0.3-SNAPSHOT/controls/search-tags/search-tags.js"/></script>
<script type="text/javascript" src="./webjars/eits-md/1.0.3-SNAPSHOT/eits-material-core.js"/></script>
<script type="text/javascript" src="./webjars/eits-md/1.0.3-SNAPSHOT/containers/box/box.js"/></script>
<script type="text/javascript" src="./webjars/eits-md/1.0.3-SNAPSHOT/containers/hbox/hbox.js"/></script>
<script type="text/javascript" src="./webjars/eits-md/1.0.3-SNAPSHOT/containers/vbox/vbox.js"/></script>
<script type="text/javascript" src="./webjars/eits-md/1.0.3-SNAPSHOT/controls/paper-sheet/paper-sheet.js"/></script>
<script type="text/javascript" src="./webjars/eits-md/1.0.3-SNAPSHOT/controls/date-picker/date-picker.js"/></script>
<script type="text/javascript" src="./webjars/eits-md/1.0.3-SNAPSHOT/controls/infinite-scroll/infinite-scroll.js"/></script>
<script type="text/javascript" src="./webjars/momentjs/2.10.3/min/moment-with-locales.min.js"/></script>
