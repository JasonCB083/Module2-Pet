const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, unique: true },
  password: String,
  email: String,
  picture: String,
  hasPet: Boolean,
  review: []
});

const User = mongoose.model('User', userSchema);

module.exports = User;