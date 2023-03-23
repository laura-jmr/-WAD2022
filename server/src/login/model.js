const mongoose = require('mongoose');

const schema = new mongoose.Schema({ username: 'string', password: 'string', role: 'string' });
const User = mongoose.model('User', schema);

// init function - insert admina
const init = async () => {
    const admina = new User({ username: 'admina', password:'password', role:'admin' });
    await admina.save();
    console.log("admina created");

    const guest = new User({ username: 'guest', password:'password', role:'guest' });
    await guest.save();
    console.log("guest created");

}
// suche nach username und passwort in der db
// gefunden = return user | nicht gefunden = return null
const login = async (username, password) => {
    try {
        const user = await User.findOne({ username, password }).lean();
        return user;
    } catch (e) {
        return null;
    }
}

module.exports = {
    init, login
}
