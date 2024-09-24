const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("../backend/routes/ProductsRoute");
const userRoutes = require("../backend/routes/UserRoute");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware Update
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve images statically

// Routes
app.use("/api", productRoutes);
app.use("/api", userRoutes);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("🔌 MongoDB connected"))
  .catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
