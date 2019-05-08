'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const borrowSchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true
  },
  petRequested: {
    type: ObjectId,
    ref: 'Pet',
    required: true
  },
  petOffered: {
    type: ObjectId,
    ref: 'Pet',
    required: true
  },
  borrower: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  approver: {
    type: ObjectId,
    ref: 'User',
    required: true
  }

});

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
