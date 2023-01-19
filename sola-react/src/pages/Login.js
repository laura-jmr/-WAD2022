import React from "react";
import "../index.css";

export default function Login({  }) {
    return (
        <div id="login">
            <form class="form" id="loginForm">
                <div id="loginTitleContainer">
                    <h1 class="Title">SoLa</h1>
                    <p class="TitleSlogan">we are SoLa your map for Solar systems in Berlin-Barndenburg</p>
                </div>
                <div id="loginDiv">
                    <h2 class="FormTitle">Login</h2>
                    <div class="FormInputGroup">
                        <input type="text" class="FormInput" id="username" name="username" placeholder="Username" required></input>
                        <input type="password" class="FormInput" id="password" name="password" placeholder="Password" required></input>
                        <div id="loginFormButtons">
                            <button class="FormButton" id="LoginButtonLogin" type="submit">Login</button>
                            <button class="FormButton" id="CancelButtonLogin" onClick="cancel_login()">Cancel</button>
                        </div>
                        <div id="login-error-response"></div>
                    </div>
                </div>
            </form>
        </div>
    )
}