//schema

const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    name:{type: String, unique: true, required: true},
    population: {type: String, unique: true, required: true},
    country:{type: String, required: true},
    latitude:{type: Number, unique: true, required: true},
    longitude: {type: Number,  required: true},
}, {Timestamp: true});

const City = mongoose.model('City', citySchema);

module.exports = City;
