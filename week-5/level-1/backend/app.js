const express = require('express');
const connectToMongoDB = require('./config/mongo.config');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

connectToMongoDB();

app.get('/', (req, res) => {
    res.send('Hello Human!');
})

app.listen(PORT, () => {
    console.log(`The Server is up and listening on the port: ${PORT}`);
})