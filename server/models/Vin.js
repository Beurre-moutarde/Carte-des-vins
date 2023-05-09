const { Schema, model } = require("mongoose");
const userSchema = require ('./User');

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
    user: { 
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true
    }
  },
);


module.exports = vinSchema;
