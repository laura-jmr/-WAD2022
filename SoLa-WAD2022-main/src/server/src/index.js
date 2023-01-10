
// connect to db
const db = require('./db_connection');
db();


// express:
const express = require('express')
const app = express()
const port = 3000

// publish client source
app.use(express.static('./../client'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// load login module
const loginModule = require('./login');
loginModule(app);
// load address-book module
const addressBookModule = require('./address-book');
addressBookModule(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
