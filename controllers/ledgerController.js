const ledger = require('./../models/ledgerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');
const APIFeatures = require('./../utils/apiFeatures')


// current date, receiver's public address
exports.createTransaction = catchAsync( async(req,res,next) => {

    const receiver = req.body.receiverPublicAddress
    const sender = req.body.senderPublicAddress
    const coins = req.body.sentCoins
    
    if(!receiver || !coins || !sender){
        return next(new AppError('please provide Receivers public address or address!',400));
    }

    let d = new Date();
    
    // gives previous hash
    let doc = await ledger.find({});
    doc = doc.slice(-1)
    const prevHash = doc[0].presentHashValue
    
    const k = d+receiver+prevHash+coins+sender

    // Hash the  with cost of 12
    const currHash = await bcrypt.hash(k, 12);
    
    //console.log(currHash); //present hash

    const data = {
        previousHashValue: prevHash,
        receiverPublicAddress:receiver,
        presentHashValue: currHash,
        numberOfCoin:coins,
        senderPublicAddress:sender
    }
    const doc1 = await ledger.create(data);
        res.status(201).json({
            status:'success',
            data: doc1
        });
    next();
})
