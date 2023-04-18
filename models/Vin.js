// Importer Mongoose
const { Schema, model } = require("mongoose");

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
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Initialise Vin model
const Vin = model("Vin", vinSchema);

module.exports = Vin;
