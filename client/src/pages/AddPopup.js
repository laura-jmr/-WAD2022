import React, {useState} from 'react'

export default function AddPopup( {visibility} ) {
    const [vis, setVisibility] = useState(visibility);
    const [fid, setId] = useState("");
    const [fname, setName] = useState("");
    const [fdescription, setDescription] = useState("");
    const [fstreet, setStreet] = useState("");
    const [fnumber, setNumber] = useState("");
    const [fzip, setZip] = useState("");
    const [fcity, setCity] = useState("");

    function getGeocoordinates(street, number, zip, city) {
        let httpRequest = new XMLHttpRequest();
    
        const url="https://nominatim.openstreetmap.org/search?q=" + number + "+"+ street + ",+" + zip + "+" + city + "&format=json&polygon_geojson=1&addressdetails=1";
    
        console.log(url)
        httpRequest.open("GET", url, false);
    
        httpRequest.onerror = function() {// diese Funktion wird ausgefuehrt, wenn ein Fehler auftritt
           console.log("Connecting to server with " + url + " failed!\n");
        };
        var lat = -1.0;
        var lon = -1.0;
        httpRequest.onload = function(e) {// diese Funktion wird ausgefuehrt, wenn die Anfrage erfolgreich war
            let data = this.response;
            let obj = JSON.parse(data);
            if (this.status == 200) {
                lat = parseFloat(obj[0].lat);
                lon = parseFloat(obj[0].lon);
            } else {     //Handhabung von nicht-200er
                console.log ("HTTP-status code was: " + obj.status);
            }
        };
        httpRequest.send();
        return [lat, lon];
    }
    
    const createAddress = async({lat,lon,name,description,street,number,zip,city}) => {
        const addressBookResponse = await fetch('http://localhost:3000/susLocs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lat,lon,name,description,street,number,zip,city})
        });
        const newAddress = await addressBookResponse.json();
        return newAddress;
    }

    const addAddress = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const geo = getGeocoordinates(fstreet, fnumber, fzip, fcity);
        console.log("new geos = " + geo[0] + " " + geo[1]);
        //document.getElementById("addTitle").innerText = "Add Location";
    
        /**
         * @type {{zip: FormDataEntryValue, city: FormDataEntryValue, street: FormDataEntryValue, number: FormDataEntryValue, name: FormDataEntryValue, description: FormDataEntryValue, gps: number[]}}
         */
        const newAddress = {
            //gps: [
            //    parseInt(formData.get('latitude').toString()),
            //    parseInt(formData.get('longitude').toString())
            //],
            lat: geo[0],
            lon: geo[1],
            name: fname,
            description: fdescription,
            street: fstreet,
            number: fnumber,
            zip: fzip,
            city: fcity,
        };
    
        //let hasId = formData.get('AddScreen_id')?.toString();
    
        //if (!hasId) { // new
        //    window.adresses.push(newAddress);
        //} else { // edit
        //    window.adresses[parseInt(hasId)] = newAddress;
        //}
        if(newAddress.lat == -1){
            alert("Can't find location, check input!");
        } else {
            const serverResponse = createAddress(newAddress)
            console.log("Added adress");
            setVisibility(false);
        }
    
    }

  return (
    <>
     {vis === true && (
        <div id="addPopUp">
            <div id="add">
                <h2 id="addTitle">Add New Locations</h2>
                    <form className="HiddenForm" id="AddScreen" onSubmit={addAddress}>
                    <div id="AddFromInputGroup">
                        <input type="text" className="FormInput" name="name" id="name" placeholder="Name*" required value={fname} onChange={(event) => setName(event.target.value)}></input>
                        <input type="text" className="FormInput" name="id" id="AddScreen_id" placeholder="Id*" style={{display: 'none'}} value={fid} onChange={(event) => setId(event.target.value)}></input>
                        <input type="text" className="FormInput" name="description" id="description" placeholder="Description*" required value={fdescription} onChange={(event) => setDescription(event.target.value)}></input>
                        <input type="text" className="FormInput" name="street" id="street" placeholder="Street*" required value={fstreet} onChange={(event) => setStreet(event.target.value)}></input>
                        <input type="text" className="FormInput" name="number" id="number" placeholder="Number*" required value={fnumber} onChange={(event) => setNumber(event.target.value)}></input>
                        <input type="text" className="FormInput" name="zip" id="zip" placeholder="ZIP*" required value={fzip} onChange={(event) => setZip(event.target.value)}></input>
                        <input type="text" className="FormInput" name="city" id="city" placeholder="City*" required value={fcity} onChange={(event) => setCity(event.target.value)}></input>
                        <input type="text" className="FormInput" name="latitude" id="latitude" placeholder="Latitude"></input>
                        <input type="text" className="FormInput" name="longitude" id="longitude" placeholder="Longitude"></input>
                    </div>
                    <div id="addButtons">
                        <button className="FormButton" id="SaveButtonAdd" type="submit" style={{width:60+ 'px'}}>Save</button>
                        <button className="FormButton" type="button" style={{width:60+ 'px'}}>Cancel</button>
                    </div>
                    <div id="form-back-button-add" style={{display: 'none'}}>
                        <button className="FormButton" type="button">Back</button>
                    </div>
                </form>
            </div>
        </div>
     )}
     </>
  )
}
