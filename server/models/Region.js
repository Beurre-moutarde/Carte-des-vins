const mongoose = require("mongoose");

const { Schema } = mongoose;
const Vin = require('./Vin');

const regionSchema = new Schema({
  region_name: { 
    type: String, 
    required: true 
  },
  vins: [Vin.schema]
});

// Initialise Region Model
const Region = mongoose.model('Region', regionSchema);

module.exports = Region;
