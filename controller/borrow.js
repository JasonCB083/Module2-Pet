'use strict';

const Pet = require('../models/pet');
const Borrow = require('../models/borrow');

const getBorrowInfo = (id) => {
  return Borrow.findOne({ _id: id })
    .then((result) => {
      if (!result) {
        return undefined;
      }
      const requestedPetId = result.petRequested;
      const offeredPetId = result.petOffered;
      const findRequestedPet = Pet.findOne({ _id: requestedPetId })
        .populate('owner');
      const findTheOfferedPet = Pet.findOne({ _id: offeredPetId })
        .populate('owner');
      return Promise.all([findRequestedPet, findTheOfferedPet])
        .then((results) => {
          const data = {
            requestedPet: results[0],
            offeredPet: results[1],
            borrowId: id,
            approver: result.approver
          };
          return data;
        });
    });
};

module.exports = { getBorrowInfo };
