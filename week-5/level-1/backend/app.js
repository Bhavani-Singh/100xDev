const express = require('express');
const connectToMongoDB = require('./config/mongo.config');
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const PORT = process.env.PORT;

connectToMongoDB();
app.use(cors({}))
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/admin', adminRoute);
app.use('/user', userRoute);


app.listen(PORT, () => {
    console.log(`The Server is up and listening on the port: ${PORT}`);
})