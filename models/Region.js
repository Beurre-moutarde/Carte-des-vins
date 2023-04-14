// Importer Mongoose
const { Schema, model } = require("mongoose");

// Définir le schéma pour la collection "Regions"
const regionSchema = new Schema({
  region_name: { type: String, required: true },
});

// Initialise Region Model
const Region = model("Region", regionSchema);

module.exports = Region;
