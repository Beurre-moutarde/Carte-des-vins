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
      required: true 
    },
    plantId: {
      type: String,
      required: true,
    },
    common_name: { 
      type: String, 
      required: true 
    },
    family: {
      type: String,
      require: true
    },
    title: {
      type: String
    },
    year: {
      type: String
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
