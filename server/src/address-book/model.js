const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    lat: 'Number',
    lon: 'Number',
    name: 'string',
    description: 'string',
    street: 'string',
    number: 'string',
    zip: 'string',
    city: 'string'
});
const Address = mongoose.model('Address', schema);

// init function - insert admina
const init = async () => {
    const samples = [
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
    for (let i = 0; i < samples.length; i++) {
        const sampleEntry = new Address(samples[i]);
        await sampleEntry.save();
        console.log(samples[i], " created");
    }
}
// Crud helper

const readAllAddress = async () => {
    try {
        return await Address.find().lean();
    } catch (e) {
        return null;
    }
}

// Crud funktionen
const createAddress = async ({lat,lon,name,description,street,number,zip,city}) => {
    try {
        const newEntry = new Address({lat,lon,name,description,street,number,zip,city});
        const address = await newEntry.save();
        return address;
    } catch (e) {
        return null;
    }
}

const readAddress = async (id) => {
    try {
        return await Address.findOne({_id: id});
    } catch (e) {
        console.error(e)
        return null;
    }
}

const updateAddress = async (id, {lat,lon,name,description,street,number,zip,city}) => {
    try {
        const addressToBeUpdated = await Address.findByIdAndUpdate( {_id: id},{lat,lon,name,description,street,number,zip,city} ).lean();
        return addressToBeUpdated;
    } catch (e) {
        return null;
    }
}

const deleteAddress = async (id) => {
    try {
        await Address.deleteOne({ _id: id });
        return true;
    } catch (e) {
        return null;
    }
}

module.exports = {
    init,
    readAllAddress,
    createAddress,
    readAddress,
    updateAddress,
    deleteAddress,
}
