import React, { useState } from 'react';
import WelcomeMessage from "../components/WelcomeMessage";
import LogoutButton from "../components/LogoutButton";
import Adressbook from "../components/Adressbook";
import Map from "../components/Map";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AddButton from "../components/AddButton";
import L, { Icon } from "leaflet";


export default function Main( {adminView, handleAddButtonClick}) {
  /*const getAllAddresses = async () => {
    const addressBookResponse = await fetch('http://localhost:3000/susLocs', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const addresses = await addressBookResponse.json();
    return addresses;
  };

  const adresses = getAllAddresses();
*/
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
const userToken = localStorage.getItem('token-info');
  return (
    <>
    {adminView === true && (
        <div id="main">
        <h2 className="FormTitle">Main</h2>
        <div id="mainNavContainer">
            <div className="mainNavBar"></div>
            <WelcomeMessage name={JSON.parse(userToken).name}/>
            <LogoutButton />
        </div>
        <div className="map-box">
            <div className="innerMapBox">
              <Adressbook adresses={[{ name: "test1", id: "63bd461f56d343d343305d12", lat: 52.5287, lon: 13.3882}, { name: "test2", id: "63bd461f56d343d343305d16", lat: 52.5089808, lon: 13.3206558}]}/>
              <Map />
            </div>
            <AddButton onClick={handleAddButtonClick}/>
        </div>
      </div>
    )
    }
    {adminView === false && (
        <div id="main">
        <h2 className="FormTitle">Main</h2>
        <div id="mainNavContainer">
            <div className="mainNavBar"></div>
            <WelcomeMessage name={JSON.parse(userToken).name}/>
            <LogoutButton />
        </div>
        <div className="map-box">
            <div className="innerMapBox">
              <Adressbook adresses={[{ name: "test1", id: "63bd461f56d343d343305d12", lat: 52.5287, lon: 13.3882}, { name: "test2", id: "63bd461f56d343d343305d16", lat: 52.5089808, lon: 13.3206558}]} adminView={adminView}/>
              <Map />
            </div>
        </div>
      </div>
    )
    }
    </>
  )
}
