import React, {useState} from 'react'

export default function EditPopup( {visibility }) {
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

    const updateAddress =async (id, {lat,lon,name,description,street,number,zip,city}) => {
        const addressBookResponse = await fetch('http://localhost:3000/susLocs/'+fid, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lat,lon,name,description,street,number,zip,city})
        });
        if (addressBookResponse.status !== 200) {
            return null;
        }
        const updatedAddress = await addressBookResponse.json();
        return updatedAddress;
    }

    const editAddress = (event) => {
        event.preventDefault();
        event.stopPropagation();
        //const formData = new FormData(editForm);
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
    
        //let hasId = formData.get('EditScreen_id')?.toString();
        if(newAddress.lat == -1){
            alert("Can't find location, check input!");
        } else {
            const serverResponse = updateAddress(fid, newAddress)
            //window.adresses[parseInt(idFromEditForm.value)] = serverResponse;
            console.log("edited " + fid);
            setVisibility(false);
        }
    }

  return (
    <>
     {vis === true && (
        <div id="editPopUp">
        <div id="edit">
            <h2 id="editTitle">Edit Location</h2>
            <form className="HiddenForm" id="EditScreen" onSubmit={editAddress}>
                <div id="EditFromInputGroup">
                    <input type="text" className="FormInput" name="name" id="name" placeholder="Name*" value={fname} required onChange={(event) => setName(event.target.value)}></input>
                    <input type="text" className="FormInput" name="id" id="EditScreen_id" placeholder="Id*" style={{display: 'none'}} value={fid} onChange={(event) => setId(event.target.value)}></input>
                    <input type="text" className="FormInput" name="description" id="description" placeholder="Description*" value={fdescription} required onChange={(event) => setDescription(event.target.value)}></input>
                    <input type="text" className="FormInput" name="street" id="street" placeholder="Street*" value={fstreet} required onChange={(event) => setStreet(event.target.value)}></input>
                    <input type="text" className="FormInput" name="number" id="number" placeholder="Number*" value={fnumber} required onChange={(event) => setNumber(event.target.value)}></input>
                    <input type="text" className="FormInput" name="zip" id="zip" placeholder="ZIP*" value={fzip} required onChange={(event) => setZip(event.target.value)}></input>
                    <input type="text" className="FormInput" name="city" id="city" placeholder="City*" value={fcity} required onChange={(event) => setCity(event.target.value)}></input>
                    <input type="text" className="FormInput" name="latitude" id="latitude" placeholder="Latitude"></input>
                    <input type="text" className="FormInput" name="longitude" id="longitude" placeholder="Longitude"></input>
                </div>
                <div id="update-delete-buttons">
                    <button className="FormButton" id="SaveButtonUpdateDelete" type="submit" style={{width:60+'px'}}>Save</button>
                    <button className="FormButton" type="button" style={{width: 60 + 'px'}}>Cancel</button>
                </div>
                <div id="form-back-button-edit" style={{display: 'none'}}>
                    <button className="FormButton" type="button" >Back</button>
                </div>
            </form>
        </div>
    </div>
     )
    }
    </>
  )
}
