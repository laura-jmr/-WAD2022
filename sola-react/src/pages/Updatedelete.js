import React from "react";
import "../index.css";

export default function Updatedelete({  }) {
    return (
        <div id="editPopUp">
            <div id="edit">
                <h2 id="editTitle">Edit Location</h2>
                <form class="HiddenForm" id="EditScreen">
                    <div id="EditFromInputGroup">
                        <input type="text" class="FormInput" name="name" id="name" placeholder="Name*" required></input>
                        <input type="text" class="FormInput" name="id" id="EditScreen_id" placeholder="Id*" style="display: none"></input>
                        <input type="text" class="FormInput" name="description" id="description" placeholder="Description*" required></input>
                        <input type="text" class="FormInput" name="street" id="street" placeholder="Street*" required></input>
                        <input type="text" class="FormInput" name="number" id="number" placeholder="Number*" required></input>
                        <input type="text" class="FormInput" name="zip" id="zip" placeholder="ZIP*" required></input>
                        <input type="text" class="FormInput" name="city" id="city" placeholder="City*" required></input>
                        <input type="text" class="FormInput" name="latitude" id="latitude" placeholder="Latitude"></input>
                        <input type="text" class="FormInput" name="longitude" id="longitude" placeholder="Longitude"></input>
                    </div>
                    <div id="update-delete-buttons">
                        <button class="FormButton" id="SaveButtonUpdateDelete" type="submit" style="width:60px;">Save</button>
                        <button class="FormButton" type="button" onclick="cancelForm()" style="width:60px;">Cancel</button>
                    </div>
                    <div id="form-back-button-edit" style="display: none">
                        <button class="FormButton" type="button" onclick="cancelForm()">Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}