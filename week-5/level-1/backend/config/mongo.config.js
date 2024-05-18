const mongoose = require('mongoose');
require('dotenv').config()
const dbUrl = process.env.MONGODB_URL;

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(dbUrl);
        console.log('Connected to DB');
    }
    catch(error) {
        console.log('Error while connecting to DB ', error);
    }
    
}

module.exports = connectToMongoDB;