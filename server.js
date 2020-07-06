const express = require("express");
const mongoose = require("mongoose");
const config = require("./config")


console.log(config)





// if (process.env.NODE_ENV === "staging") {
//     port = process.env.STAGING_PORT
// } else {
//     port = process.env.PORT || process.env.LOCAL_PORT
// }



// const stations = require("./routes/api/stations");

mongoose.connect("mongodb://localhost:27017/fs09-vexere", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connect DB successull"))
    .catch(console.log)


const app = express();

app.use(express.json())

app.use("/uploads", express.static("./uploads"))

app.use("/api", require("./routes/api/controllers/stations"))
app.use("/api/trips", require("./routes/api/controllers/trips"))
app.use("/api/users", require("./routes/api/controllers/users"))
app.use("/api/tickets", require("./routes/api/controllers/ticket"))





// app.get("/api/stations", stations.getStations);
// app.get("/api/stations/:id", stations.getStationById);
// app.put("/api/stations/:id", stations.putStationById);
// app.post("/api/stations", stations.postStation);
// app.patch("/api/stations/:id", stations.patchStationById);
// app.delete("/api/stations/:id", stations.deleteStationById);



const port = process.env.PORT || config.port;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})

// npm run start:watch
// yarn start:watch



