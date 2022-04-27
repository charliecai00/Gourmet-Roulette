const mongoose = require('mongoose');
require('dotenv').config();

const Schema = new mongoose.Schema({
  name: {type: String, required: true},
  district: {type: String, required: true},
  cuisine: {type: String, required: true},
});

const Restaurant = mongoose.model('Restaurant', Schema);

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to database');
  }
});

module.exports = Restaurant;
