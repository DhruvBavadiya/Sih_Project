const mongoose = require("mongoose");

const mongoconnect = () => {
    mongoose.connect(
        "mongodb://127.0.0.1:27017/Bustravel", { useNewUrlParser: true, useUnifiedTopology: true }).
        then((data) => {
        console.log(`${data.connection.host}`);
        })
}

module.exports = mongoconnect