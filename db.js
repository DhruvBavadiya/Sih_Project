const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://bavadiyadhruv:Frj1ogDYcNbnDnUo@cluster0.x7jcce8.mongodb.net/" // Replace with your environment variable name

console.log("MongoDB URI:", mongoURI); // Add this line to check the value
const mongoconnect = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = mongoconnect;
