const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    previousHashValue: {
      type: String,
    },
    senderPublicAddress: {
        type: String,
      },
    receiverPublicAddress: {
        type: String,
      },
    numberOfCoin: {
        type: Number,
      },
    presentHashValue: {
        type: String,
      },
    magicNumber: {
        type: String,
      },
      createdAt: {
        type:Date,
        default:Date.now(),  
     },
  });


  const Ledger = mongoose.model('Ledger', ledgerSchema);

  module.exports = Ledger; 

  