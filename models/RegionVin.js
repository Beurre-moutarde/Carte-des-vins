// Importer Mongoose
const { Schema, model } = require("mongoose");

// Définir le schéma pour la collection "RegionVins"
const regionVinSchema = new Schema({
  region_id: {
    type: Schema.Types.ObjectId,
    ref: "Region",
    required: true,
  },
  vin_id: { type: Schema.Types.ObjectId, ref: "Vin", required: true },
});

// Initialise RegionVin Model
const RegionVin = model("RegionVin", regionVinSchema);

// Exporter les modèles
module.exports = { RegionVin };
