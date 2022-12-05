/**
 * Define Globals
 */
// use for address book storage
window.adresses = [
    {
        lat: 52.5287,
        lon: 13.3882,
        name: 'Novalisstraße 11',
        description: 'A',
        street: 'Novalisstraße',
        number: '11',
        zip: '10115',
        city: 'Berlin'
    },
    {
        lat: 52.5152,
        lon: 13.4614,
        name: 'Frankfurter Allee 35',
        description: 'B',
        street: 'Frankfurter Allee',
        number: '35',
        zip: '10247',
        city: 'Berlin'
    },
    {
        lat: 52.5088, 
        lon: 13.3132,
        name: 'Goethestraße 8',
        description: 'C',
        street: 'Goethestraße',
        number: '8',
        zip: '10623',
        city: 'Berlin'
    },
    {
        lat: 52.505047, 
        lon: 13.351844,
        name:'Lützowplatz 17',
        description: 'viel',
        street: 'Lützowplatz',
        number: '17',
        zip: '10785',
        city: 'Berlin',
    }
];
window.activeMarker = [];

/* address book */
const adressbookContainer = document.getElementById('map-address-list');
/* addForm and editForm */
const addForm = document.getElementById("AddScreen");
const editForm = document.getElementById("EditScreen");

const idFromAddForm = document.getElementById('AddScreen_id');
const idFromEditForm = document.getElementById('EditScreen_id');
/* Leaflet */
const mapContainer = document.getElementById('map');
const Berlin = [52.52, 13.40];
const map = L.map(mapContainer).setView(Berlin, 10);

L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function renderMarker() {
    // lösche alle marker
    removeAllMarker();
    // lege marker neu an
    for (let i = 0; i < window.adresses.length; i++) {
        const aktuelleAdresse = window.adresses[i];
        const marker = L.marker([aktuelleAdresse.lat, aktuelleAdresse.lon])
            .addTo(map)
            .bindPopup(aktuelleAdresse.name);
        window.activeMarker.push(marker);
    }
}

function removeAllMarker() {
    for (let i = 0; i < window.activeMarker.length; i++) {
        const aktuellerMarker = window.activeMarker[i];
        map.removeLayer(aktuellerMarker);
    }
    window.activeMarker = [];
}

function renderAddressBook() {
    // clear
    adressbookContainer.innerHTML = '';
    loadLocalStorageToAddresses();
    for (let i = 0; i < window.adresses.length; i++) {
        let updateDeleteButtons = `<div><button style="width:20px;height:20px;" onclick="editAddressbook(${i})">Details</button></div>`;
        if (getCurrentRole() === 0) {
            document.getElementById('addButtons').style.display = 'none';
            document.getElementById('form-back-button-edit').style.display = '';
            var inputs = document.getElementById("EditFromInputGroup").getElementsByTagName('input');
            console.log(inputs)
            for (let i = 0; i < inputs.length; i++) {
                console.log(inputs[i])
                inputs[i].disabled = true;
            };
            document.getElementById("SaveButtonUpdateDelete").style.display = "none";
        }

        if (getCurrentRole() === 1) {
            updateDeleteButtons = `<div style="margin-top:10px;">
                <button style="width:20px;height:20px;" onclick="editAddressbook(${i})">Edit</button>
                <button style="width:20px;height:20px;" onclick="deleteAddressbookEntry(${i})">Delete</button>
           </div>`;
            document.getElementById('addButton').style.display = '';
        }
        const aktuelleAdresse = window.adresses[i];
        //adressbookContainer.innerHTML += `<li>
        //   <div>${aktuelleAdresse.name}</div>
        //   ${updateDeleteButtons}
        //</li>`;
        console.log("rendering " + i);
        adressbookContainer.innerHTML += `<li>
            <a onClick="editAddressbook(${i})" style="cursor: pointer; cursor: hand;">${aktuelleAdresse.name}</a>
        </li>`;
    };

}

function renderMapBox() {
    updateLocalStorage();
    renderAddressBook();
    renderMarker();
    console.log("rendered");
    // remove all input values from form
    addForm.reset();

}

function updateLocalStorage() {
    localStorage.clear();
    for (let i = 0; i < window.adresses.length; i++) {
        let aktuelleAdresse = window.adresses[i];
        let adresseJSON = JSON.stringify(aktuelleAdresse);
        console.log(adresseJSON);
        localStorage.setItem(aktuelleAdresse.lat + "," + aktuelleAdresse.lon, adresseJSON);
    };
    console.log("updated local storage");
}

function loadLocalStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

function loadLocalStorageToAddresses() {
    window.adresses = [];
    let loadedAdresses = loadLocalStorage();
    for (let i = 0; i < loadedAdresses.length; i++) {
        let loadedAdressJSON = JSON.parse(loadedAdresses[i]);
        window.adresses.push(loadedAdressJSON);
    };
}

loadLocalStorageToAddresses();
renderMapBox();

/**
 * add Address
 */
const addAddress = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(addForm);
    const geo = getGeocoordinates(formData.get('street'), formData.get('number'), formData.get('zip'), formData.get('city'));
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
        name: formData.get('name'),
        description: formData.get('description'),
        street: formData.get('street'),
        number: formData.get('number'),
        zip: formData.get('zip'),
        city: formData.get('city'),
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
        window.adresses.push(newAddress);
        // lösche input werte
        addForm.reset();
        renderMapBox();
        routeTo('main');
    }
    
}

const editAddress = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(editForm);
    const geo = getGeocoordinates(formData.get('street'), formData.get('number'), formData.get('zip'), formData.get('city'));
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
        name: formData.get('name'),
        description: formData.get('description'),
        street: formData.get('street'),
        number: formData.get('number'),
        zip: formData.get('zip'),
        city: formData.get('city'),
    };

    //let hasId = formData.get('EditScreen_id')?.toString();
    if(newAddress.lat == -1){
        alert("Can't find location, check input!");
    } else {
        window.adresses[parseInt(idFromEditForm.value)] = newAddress;
        console.log("edited " + parseInt(idFromEditForm.value));
        renderMapBox();
        routeTo('main');
    }
}
// bind submit
addForm.addEventListener('submit', addAddress);
editForm.addEventListener('submit', editAddress);

/**
 * Edit Address
 */

function editAddressbook(id) {
    console.log("editing adress id " + id);
    idFromEditForm.value = id;
    const selectedAddress = window.adresses[id];
    for (const [key, value] of Object.entries(selectedAddress)) {
        const field = editForm.elements.namedItem(key)
        // if field exist put input into it
        if (field) {
            field.value = value
        }
    }
    //document.getElementById("addTitle").innerText = "Edit Location";
    // gps are handled differently
    const latitudeInput = editForm.elements.namedItem('latitude')
    const longitudeInput = editForm.elements.namedItem('longitude')
    latitudeInput.value = selectedAddress.lat;
    longitudeInput.value = selectedAddress.lon;
    /* check if user can edit */
    if (getCurrentRole() === 0) {
        document.getElementById('update-delete-buttons').style.display = 'none';
        document.getElementById('form-back-button-edit').style.display = '';
        document.getElementById('update-delete-buttons').style.display ='none'
    } else {
        //if(!document.getElementById("update-delete-buttons").innerHTML.toString().includes('deleteAddressbookEntry')) {
        //    document.getElementById("update-delete-buttons").innerHTML += `<button id="DeleteButton" style="width:60px;" onclick="deleteAddressbookEntry(${id})">Delete</button>`;
        //}
        if (document.contains(document.getElementById("DeleteButton"))) {
            document.getElementById("DeleteButton").remove();
            document.getElementById("update-delete-buttons").innerHTML += `<button id="DeleteButton" style="width:60px;" onclick="deleteAddressbookEntry(${id})" type="button">Delete</button>`;
        }   else {
            document.getElementById("update-delete-buttons").innerHTML += `<button id="DeleteButton" style="width:60px;" onclick="deleteAddressbookEntry(${id})" type="button">Delete</button>`;
        }
        document.getElementById('update-delete-buttons').style.display = '';
        document.getElementById('form-back-button-edit').style.display = 'none';
    }
    routeTo('edit');
}

/**
 * Delete Entry from Addressbook
 */
function deleteAddressbookEntry(id) {
    console.log("deleting adress id " + id);
    window.adresses.splice(id, 1);
    //renderAddressBook();
    renderMapBox();
    routeTo('main');
}

/**
 * cancel button
 */
function cancelForm() {
    // render address book again - just to be safe
    renderAddressBook();
    // route
    routeTo('main');
}

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
