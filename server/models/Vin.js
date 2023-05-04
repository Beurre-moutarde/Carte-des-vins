const mongoose = require('mongoose');
const { Schema } = require("mongoose");

// Définir le schéma pour la collection "Vins"
const vinSchema = new Schema(
  {
    vin_name: { 
      type: String, 
      required: true 
    },
    millesime: { 
      type: Number, 
      required: true 
    },
    producteur: { 
      type: String, 
      required: true 
    },
    region: { 
      type: Schema.Types.ObjectId, 
      ref: "Region"
    }
  },
);


// Initialise Vin model
const Vin = mongoose.model("Vin", vinSchema);

module.exports = Vin;
