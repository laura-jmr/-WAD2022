
// connect to db
const db = require('./db_connection');
db();
console.log("connected to db");


// express:
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000

// publish client source
app.use(express.static('./../../client/public'));
app.use(express.json());
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));
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
