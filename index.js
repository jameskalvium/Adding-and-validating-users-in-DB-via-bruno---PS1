const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose")
require("dotenv").config()

const route = require('./routes/auth');
const app = express();
const port = 3010;

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("Mongo DB connected successfully"))
    .catch((err=> console.error(err)))

app.use(express.static('static'));
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use('/api/auth',route)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
