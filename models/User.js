const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      match:
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-=`{}\[\]|\\:;"'<>,.?\/])(?!.*\s).{8,}$/,
    },
    vin: [
      {
         type: Schema.Types.ObjectId, 
         ref: "Vin" 
        }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Initialise Vin model
const User = model("User", userSchema);

module.exports = User;
