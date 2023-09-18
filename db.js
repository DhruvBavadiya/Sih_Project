const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path : "F:/dhruv/webd/practice/SIH/Backend/config/config.env"})

const mongoURI = process.env.DB_URL
const mongoconnect = () => {
    mongoose.connect(
        mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).
        then((data) => {
        console.log(`${data.connection.host}`);
        })
}

module.exports = mongoconnect