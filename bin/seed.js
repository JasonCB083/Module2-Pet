const mongoose = require('mongoose');
const Pet = require('./../models/pet');
const data = require('./data.json');
const config = require('./../config/config');

mongoose.connect(`mongodb://localhost/${config.DB_NAME}`)

Pet.collection.drop();

Pet.create(data, (err, result) => {
  if (err) console.log('ERROR', err);
  else {
    console.log('Created pets colelction', result)
    mongoose.connection.close();
  }
});
