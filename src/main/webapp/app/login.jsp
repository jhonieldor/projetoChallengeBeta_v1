<%-- 
    Document   : login
    Created on : 02/12/2015, 15:38:22
    Author     : jhoni
--%>

<div id="formLogin">
    <form novalidate="" name="loginForm">
        <div layout="column" layout-align="start center" >
            <md-input-container id="fields" >
                <label>Login</label>
                <input name="login" ng-model="" type="text" maxlength="145" autofocus="" required=""/>
                <ng-messages for="loginForm.email.$error">
                    <ng-message when="required">Login</ng-message>
                </ng-messages>
            </md-input-container>

            <md-input-container id="fields">
                <label>Senha</label>

                <!-- minlength="6" -->

                <input name="password" ng-model="" type="password"  maxlength="25" required=""/>
                <ng-messages for="loginForm.password.$error">
                    <ng-message when="required">Senha</ng-message>
                    <!-- <ng-message when="minlength">{{::'password.tooShort' | translate}}</ng-message> -->
                </ng-messages>
            </md-input-container>

            <md-button id="fields" type="submit" id="loginButton" ng-click="login()" style=" background-color: #0077BF; color: #FFFFFF;">Entrar</md-button>
            <!--<p>
                <a ui-sref="recoveryPassword" href="">{{::'password.forgotPassword'| translate}}</a>
            </p>-->
        </div>
    </form>
</div>
