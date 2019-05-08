const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const petSchema = new Schema({
  petName: String,
  description: String,
  age: Number,
  type: { type: String, enum: ['Cat', 'Dog'] },
  picture: String,
  size: { type: String, enum: ['ExtraSmall', 'Small', 'Medium', 'Large', 'ExtraLarge'] },
  isAvailable: {type: Boolean, default: true},
  isPending: {type: Boolean, default: true}
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
