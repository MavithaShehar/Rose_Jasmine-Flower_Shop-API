const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const addsRoutes = require("./routes/addsRouter");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/adds", addsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
