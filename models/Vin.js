// Importer Mongoose
const { Schema, model } = require("mongoose");

// Définir le schéma pour la collection "Vins"
const vinSchema = new Schema(
  {
    vin_name: { type: String, required: true },
    millesime: { type: Number, required: true },
    producteur: { type: String, required: true },
    note: { type: Number, min: 0, max: 5, default: 0 },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called notes that add a note to a wine
vinSchema.virtual("notes").get(function () {
  return this.note;
});

// Create a virtual called "avis" that adds avis/opinions to a wine
vinSchema.virtual("avis", {
  ref: "Avis",
  localField: "_id",
  foreignField: "vin",
});

// Initialise Vin model
const Vin = model("Vin", vinSchema);

module.exports = Vin;
