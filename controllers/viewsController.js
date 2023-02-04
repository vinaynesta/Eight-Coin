
const User = require('../models/userModel');
const Ledger = require('../models/ledgerModel');
const catchAsync = require('./../utils/catchAsync');

exports.getIndex = catchAsync( async (req,res,next) => {
  
    res.status(200).render('index',{
        title: '',
    });
});

exports.getLoginForm = catchAsync( async(req,res)=> {
  res.render('login',{
    title: '| Login',
  })
});

exports.getSignUpForm = catchAsync( async(req,res)=> {
  res.render('signup',{
    title: '| Sign up',
  })
});
exports.getCpin = catchAsync( async(req,res)=> {
  res.render('cpin',{
    title: '| Set-up Cpin',
  })
});

exports.getAccount = catchAsync( async(req,res)=> {
  res.render('account',{
    title: 'Account',
  })
})
exports.getProfile = catchAsync( async(req,res)=> {
  res.render('profile',{
    title: ' ',
  })
})
exports.getPayment = catchAsync( async(req,res)=> {
  res.render('payment',{
    title: ' | Payment',
  })
})


exports.bs = catchAsync( async(req,res)=> {
  res.render('bookStore',{
    title: ' e book store',
  })
})


exports.paymerchant = catchAsync( async(req,res)=> {
  res.render('payMerchant',{
    title: ' pay',
  })
})
exports.clothes = catchAsync( async(req,res)=> {
  res.render('clothes',{
    title: ' pay',
  })
})
exports.carstore = catchAsync( async(req,res)=> {
  res.render('carstore',{
    title: ' pay',
  })
})
exports.orders = catchAsync( async(req,res)=> {

  let a = res.locals.user
  let order = a.orders

  res.render('orders',{
    title: ' pay',
    orders:order
  })
})

exports.ledgerr = catchAsync( async(req,res)=> {

  let doc = await Ledger.find({});
  // console.log(doc);
  res.render('ledger',{
    title: ' pay',
    doc:doc
  })
}) 

  