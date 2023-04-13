// Importer Mongoose
const mongoose = require("mongoose");

// Définir le schéma pour la collection "Regions"
const regionSchema = new mongoose.Schema({
  region_name: { type: String, required: true },
});

// Définir le schéma pour la collection "Vins"
const vinSchema = new mongoose.Schema({
  vin_name: { type: String, required: true },
  millesime: { type: Number, required: true },
  producteur: { type: String, required: true },
  note: { type: Number, required: true },
  avis: { type: String, required: true },
});

// Définir le schéma pour la collection "RegionVins"
const regionVinSchema = new mongoose.Schema({
  region_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
    required: true,
  },
  vin_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vin", required: true },
});

// Définir les modèles pour chaque schéma
const Region = mongoose.model("Region", regionSchema);
const Vin = mongoose.model("Vin", vinSchema);
const RegionVin = mongoose.model("RegionVin", regionVinSchema);

// Exporter les modèles
module.exports = { Region, Vin, RegionVin };
