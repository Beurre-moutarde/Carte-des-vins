const { Schema, model } = require ("mongoose");
const bcrypt = require('bcrypt');
// const vinSchema = require('./Vin');
const { Data, dataSchema } = require ("./Data");


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  savedData: [dataSchema],
},

{
  toJSON: {
    virtuals: true,
  },
}

);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual("vinCount").get(function() {
  return this.savedVins.length;
});

const User = model('User', userSchema);

module.exports = User;
