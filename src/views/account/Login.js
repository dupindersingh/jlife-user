import React from 'react'

import logIn from '../../actions/logIn'
import {
    Page,
} from '../../styles/layout'
import './login.css'

const Login = () => (
    <Page className="login-page">
        <div>
            <div className="login-container">
                <h1 className="login-header">Log In</h1>
                <div id="loginForm" className="login-form">
                    <form id="loginForm" name="loginForm" data-name="loginForm" redirect="/menu" data-redirect="/menu">
                        <input type="email" className="signup-email" maxLength="256" name="Login-Email"
                               data-name="Login Email" placeholder="Email" id="loginEmail" required=""/>
                        <input type="password" className="signup-password" maxLength="256" name="loginPassword"
                               data-name="Login Password" placeholder="password" id="loginPassword" required=""/>
                    </form>
                </div>
                <button id="loginButton" className="submit-button" onClick={logIn}>Log In</button>
                <p id="loginError" className="error-message">Error message</p>
                <a id="forgotPassword" href="reset-password">
                    <div className="link">Forgot Password?</div>
                </a><a href="./signup" className="link">Don&#x27;t have an account? Make one</a></div>
        </div>
    </Page>
)

export default Login
