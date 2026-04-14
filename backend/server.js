
// server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

// Load environment variables FIRST
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());            // allow frontend (localhost:5173)
app.use(express.json());    // parse JSON body

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", contactRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});