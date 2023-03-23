
// connect to db
const db = require('./db_connection');
db();

// insert samples
const loginModule = require('./login/model');
const addressBookModule = require('./address-book/model');
(async () => {
    await loginModule.init();
    await addressBookModule.init();
    process.exit(0);
})()

