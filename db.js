const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path : "F:/dhruv/webd/practice/SIH/Backend/config/config.env"})
const mongoconnect = () => {
    mongoose.connect(
        process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).
        then((data) => {
        console.log(`${data.connection.host}`);
        })
}

module.exports = mongoconnect