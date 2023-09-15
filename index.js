const express = require("express");
const mongoconnect = require("./db")
const errorMiddleware = require("./Middleware/errors")
const app = express();
const port = 5000;

app.use(express.json());
const bus = require("./Routes/busRoutes")
const book = require("./Routes/bookingRoute")

mongoconnect();
// app.get("/",()=>{
//     res.send("heelo")
// })

app.use("/app/vr1",bus)
app.use("/app/vr1",book)
app.use(errorMiddleware);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
