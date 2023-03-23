const model = require('./model');
const router = require('./router');


const addressBookModule = (app) => {

    const readAllAddress = async (req, res) => {
        res.json(await model.readAllAddress())
    }

    const createAddress = async (req, res) => {
        const newAddress = req.body;
        const saved = await model.createAddress(newAddress)
        res.json(saved);

    }
    const readAddress = async (req, res) => {
        const id = req.params.id;
        const address = await model.readAddress(id)
        res.json(address);
    }
    const updateAddress = async (req, res) => {
        const id = req.params.id;
        const newAddressValues = req.body;

        const updatedAddress = await model.updateAddress(id, newAddressValues);
        res.json(updatedAddress);
    }
    const deleteAddress = async (req, res) => {
        const id = req.params.id;
        const deleted = await model.deleteAddress(id);
        res.json(deleted);
    }

    const handlers = {
        readAllAddress,
        createAddress,
        readAddress,
        updateAddress,
        deleteAddress,
    }
    router(app, handlers);
}

module.exports = addressBookModule;
