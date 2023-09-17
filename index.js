const express = require("express");
const mongoconnect = require("./db")
const errorMiddleware = require("./Middleware/errors")
const dotenv = require("dotenv");
var cors = require('cors')

dotenv.config({path : "F:/dhruv/webd/practice/SIH/Backend/config/config.env"})
const app = express();
// const port = 5000;

app.use(express.json());
app.use(cors())
const bus = require("./Routes/busRoutes")
const book = require("./Routes/bookingRoute")

mongoconnect();
// app.get("/",()=>{
//     res.send("heelo")
// })

app.use("/app/vr1",bus)
app.use("/app/vr1",book)
app.use(errorMiddleware);


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
