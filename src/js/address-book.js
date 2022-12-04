/**
 * Define Globals
 */
// use for address book storage
window.adresses = [
    {
        gps: [52.5287, 13.3882],
        name: 'Novalisstraße 11',
        description: 'A',
        street: 'Novalisstraße 11',
        zip: 'A',
        city: 'berlin'
    },
    {
        gps: [52.5152, 13.4614],
        name: 'Frankfurter Allee 35',
        description: 'B',
        street: 'Frankfurter Allee 35',
        zip: 'B',
        city: 'berlin'
    },
    {
        gps: [52.5088, 13.3132],
        name: 'Goethestraße 8',
        description: 'C',
        street: 'Goethestraße 8',
        zip: 'C',
        city: 'berlin'
    },
    {
        gps:[52.8515391, 12,4586490],
        name:'am Umspannwerk 5',
        description: 'viel',
        street: 'am Umspannwerk 5',
        zip: '16845',
        city: 'neustadt dosse',
    }
];
window.activeMarker = [];

/* address book */
const adressbookContainer = document.getElementById('map-address-list');
/* editForm */
const addOrEditForm = document.getElementById("AddOrEditScreen");

const idFromForm = document.getElementById('AddOrEditScreen_id');
/* Leaflat */
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
        const marker = L.marker(aktuelleAdresse.gps)
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
    adressbookContainer.innerHTML = ''
    for (let i = 0; i < window.adresses.length; i++) {
        let updateDeleteButtons = `<div><button style="width:20px;height:20px;" onclick="editAddressbook(${i})">Details</button></div>`;
        if (getCurrentRole() === 0) {
            document.getElementById('update-delete-buttons').style.display = 'none';
            document.getElementById('form-back-button').style.display = '';

        }

        if (getCurrentRole() === 1) {
            updateDeleteButtons = `<div style="margin-top:10px;">
                <button style="width:20px;height:20px;" onclick="editAddressbook(${i})">Edit</button>
                <button style="width:20px;height:20px;" onclick="deleteAddressbookEntry(${i})">Delete</button>
           </div>`;
            document.getElementById('addButton').style.display = '';
        }
        const aktuelleAdresse = window.adresses[i];
        adressbookContainer.innerHTML += `<li>
           <div>${aktuelleAdresse.name}</div>
           ${updateDeleteButtons}
       </li>`
    }
}

function renderMapBox() {
    renderAddressBook();
    renderMarker();
    // remove all input values from form
    addOrEditForm.reset();

}

renderMapBox();

/**
 * add Address
 */
const addOrEditAddress = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(addOrEditForm);
    //document.getElementById("addTitle").innerText = "Add Location";

    /**
     * @type {{zip: FormDataEntryValue, city: FormDataEntryValue, street: FormDataEntryValue, name: FormDataEntryValue, description: FormDataEntryValue, gps: number[]}}
     */
    const newAddress = {
        gps: [
            parseInt(formData.get('latitude').toString()),
            parseInt(formData.get('longitude').toString())
        ],
        name: formData.get('name'),
        description: formData.get('description'),
        street: formData.get('street'),
        zip: formData.get('zip'),
        city: formData.get('city'),
    };

    let hasId = formData.get('AddOrEditScreen_id')?.toString();

    if (!hasId) { // new
        window.adresses.push(newAddress);
    } else { // edit
        window.adresses[parseInt(hasId)] = newAddress;
    }
    // lösche input werte
    addOrEditForm.reset();
    renderMapBox();
    routeTo('main');
}
// bind submit
addOrEditForm.addEventListener('submit', addOrEditAddress);

/**
 * Edit Address
 */

function editAddressbook(id) {
    idFromForm.value = id;
    const selectedAddress = window.adresses[id];
    for (const [key, value] of Object.entries(selectedAddress)) {
        const field = addOrEditForm.elements.namedItem(key)
        // if field exist put input into it
        if (field) {
            field.value = value
        }
    }
    //document.getElementById("addTitle").innerText = "Edit Location";
    // gps are handled differently
    const latitudeInput = addOrEditForm.elements.namedItem('latitude')
    const longitudeInput = addOrEditForm.elements.namedItem('longitude')
    latitudeInput.value = selectedAddress.gps[0];
    longitudeInput.value = selectedAddress.gps[1];
    /* check if user can edit */
    if (getCurrentRole() === 0) {
        document.getElementById('update-delete-buttons').style.display = 'none';
        document.getElementById('form-back-button').style.display = '';
        document.getElementById('addButton').style.display ='none'
    } else {
        document.getElementById('update-delete-buttons').style.display = '';
        document.getElementById('form-back-button').style.display = 'none';
    }
    routeTo('add');
}

/**
 * Delete Entry from Addressbook
 */
function deleteAddressbookEntry(id) {
    window.adresses.splice(id, 1);
    renderAddressBook();
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
