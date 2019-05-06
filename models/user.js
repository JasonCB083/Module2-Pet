const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  picture: String,
  hasPet: Boolean,
  review: [],
  pets: [{
    type: ObjectId,
    ref: 'Pet'
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
