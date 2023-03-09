const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, 'This username is already taken'],
      required: [true, 'You must enter a username'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'You must enter an email address'], 
      unique: [true, 'This email address is already in use'],
      validate: validateEmail,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports= User;