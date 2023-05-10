const { Schema, model } = require("mongoose");
const userSchema = require ('./User');

// Définir le schéma pour la collection "Plants"
const plantSchema = new Schema(
  {
    authors: [{ 
      type: String, 
       
    }],
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
    image: {
      type: String,
    },
    link: {
      type: String,
    },
  },
);


module.exports = plantSchema;
