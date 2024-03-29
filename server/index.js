const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require('cors');
const TokenRoute = require("./routes/token")
const productRoutes = require("./routes/product");

const app = express();

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use(express.json());
app.use(cors());

// Routes
app.use("/token", TokenRoute);
app.use("/products", productRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});


app.listen(5000, () => {
    console.log("Server running");
});
