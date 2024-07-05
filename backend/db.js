require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.Dburl;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)

}

module.exports = connectToMongo;