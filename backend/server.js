const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require("./routes/routeTask.js");
const dotenv = require("dotenv").config()
const Port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.listen(Port, () => console.log('Server running on http://localhost:5000'));
  });
