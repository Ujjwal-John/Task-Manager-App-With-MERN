const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require("./routes/routeTask.js");
require("dotenv").config(); // Moved to top for clarity

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.CONNECTION_STRING;

if (!MONGO_URI) {
  console.error("❌ MongoDB connection string is missing. Check your .env file.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
