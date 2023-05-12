const { Schema, model } = require("mongoose");
const userSchema = require ('./User');

// Définir le schéma pour la collection "Plants"
const plantSchema = new Schema(
  {
    author: { 
      type: String, 
    },
    bibliography: { 
      type: String, 
    },
    plantId: {
      type: Number,
      required: true,
    },
    common_name: { 
      type: String, 
    },
    family: {
      type: String,
    },
    title: {
      type: String
    },
    year: {
      type: Number
    },
    observations: {
      type: String
    },
    image: {
      type: String,
    },
    links: [{
      type: String,
    }],
    scientificname: {
      type: String
    },
  },
);


module.exports = plantSchema;
