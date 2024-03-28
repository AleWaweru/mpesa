const express = require("express");

const app = express();
const cors = require('cors');
const TokenRoute = require("./routes/token")

app.listen(5000, ()=> {
    console.log("server running")
});
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Mpesa programming in progress, time to get paid");
});
app.use(cors());
app.use("/token", TokenRoute);