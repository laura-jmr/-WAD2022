const apiClient = () => {
    // return user if success or null for failure
    const login =async (username, password) => {
        const userResponse = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        if(userResponse.status === 401) {
            return null;
        }
        const user = await userResponse.json();
        return user;
    }

    // address book
    const getAllAddresses =async () => {
        const addressBookResponse = await fetch('http://localhost:3000/susLocs', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const addresses = await addressBookResponse.json();
        return addresses;
    }
    // crud
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
    const readAddress =async (id) => {
        const addressBookResponse = await fetch('http://localhost:3000/susLocs/'+id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (addressBookResponse.status !== 200) {
            return null;
        }
        const address = await addressBookResponse.json();
        return address;
    }
    const updateAddress =async (id, {lat,lon,name,description,street,number,zip,city}) => {
        const addressBookResponse = await fetch('http://localhost:3000/susLocs/'+id, {
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
    const deleteAddress =async (id) => {
        const addressBookResponse = await fetch('http://localhost:3000/susLocs/'+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (addressBookResponse.status === 200) {
            return true;
        }
        return false;
    }

    return {
       user: {
           login
        },
        addressbook:{
           getAllAddresses,
            createAddress,
            readAddress,
            updateAddress,
            deleteAddress,
        }
    }
}

window.apiClient = apiClient();
