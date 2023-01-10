// db
const mongoose = require('mongoose');

const connect = () => {
    // Import the mongoose module
    const mongoose = require("mongoose");

// Set up default mongoose connection
    const mongoDB = "mongodb://0.0.0.0:27017/my_database";
    mongoose.connect(mongoDB);

// Get the default connection
    const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    return db;
}

module.exports = connect
