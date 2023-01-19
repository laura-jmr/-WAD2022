import React from "react";
import "../index.css";

export default function Main({  isAdmin }) {
    return (
        <div id="main">
            <h2 class="FormTitle">Main</h2>
            <div id="mainNavContainer">
                <div class="mainNavBar"></div>
                <div class="mainNavBar">
                    <p>Welcome</p>
                    <h1 id ="greetingHeader"></h1>
                    <p>to Sola, enjoy!</p>
                </div>
                <div class="mainNavBar">
                    <button id="LogoutButton" onclick="logout()">Logout</button>
                </div>
            </div>
            <div class="map-box">
                <div class="innerMapBox">
                    <ul class="locations" id="map-address-list"></ul>
                    <div class="map" id="map"></div>
                </div>
                <div class="innerMapBoxAddButtonContainer" id="addButton">
                    <button id="AddButtonMain" onclick="routeTo('add')">Add</button>
                </div>
            </div>
        </div>
    )
}