const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const petSchema = new Schema({
  petName: String,
  description: String,
  age: Number,
  picture: String,
  size: { type: String, enum: ['ExtraSmall', 'Small', 'Medium', 'Large', 'ExtraLarge'] },
  isAvailable: Boolean
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
