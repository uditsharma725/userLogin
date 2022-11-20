const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/formValidation';

const connectDB = () => {
    mongoose.connect(URI, ()=> console.log("Database Connected"));
}

module.exports = connectDB;