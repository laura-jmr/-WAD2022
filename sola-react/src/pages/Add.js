import React from "react";
import "../index.css";

export default function Add({  }) {
    return (
        <div id="addPopUp">
            <div id="add">
                <h2 id="addTitle">Add New Locations</h2>
                <form class="HiddenForm" id="AddScreen">
                    <div id="AddFromInputGroup">
                        <input type="text" class="FormInput" name="name" id="name" placeholder="Name*" required></input>
                        <input type="text" class="FormInput" name="id" id="AddScreen_id" placeholder="Id*" style="display: none"></input>
                        <input type="text" class="FormInput" name="description" id="description" placeholder="Description*" required></input>
                        <input type="text" class="FormInput" name="street" id="street" placeholder="Street*" required></input>
                        <input type="text" class="FormInput" name="number" id="number" placeholder="Number*" required></input>
                        <input type="text" class="FormInput" name="zip" id="zip" placeholder="ZIP*" required></input>
                        <input type="text" class="FormInput" name="city" id="city" placeholder="City*" required></input>
                        <input type="text" class="FormInput" name="latitude" id="latitude" placeholder="Latitude"></input>
                        <input type="text" class="FormInput" name="longitude" id="longitude" placeholder="Longitude"></input>
                    </div>
                    <div id="addButtons">
                        <button class="FormButton" id="SaveButtonAdd" type="submit" style="width:60px;">Save</button>
                        <button class="FormButton" type="button" onclick="cancelForm()" style="width:60px;">Cancel</button>
                    </div>
                    <div id="form-back-button-add" style="display: none">
                        <button class="FormButton" type="button" onclick="cancelForm()">Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}