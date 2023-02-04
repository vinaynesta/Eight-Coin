const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();
  



router.get('/carstore',authController.isLoggedIn,authController.protect,viewsController.carstore);
router.get('/bookstore',authController.isLoggedIn,authController.protect,viewsController.bs);
router.get('/clothes',authController.isLoggedIn,authController.protect,viewsController.clothes);
router.get('/paymerchant',authController.isLoggedIn,authController.protect,viewsController.paymerchant);
router.get('/orders',authController.isLoggedIn,authController.protect,viewsController.orders);
router.get('/ledger',authController.isLoggedIn,authController.protect,viewsController.ledgerr);


router.get('/',authController.isLoggedIn,viewsController.getIndex);
router.get('/login',authController.isLoggedIn,viewsController.getLoginForm);
router.get('/signup',authController.isLoggedIn,viewsController.getSignUpForm);

router.get('/cpin',authController.isLoggedIn,authController.protect,viewsController.getCpin);
router.get('/account',authController.isLoggedIn,authController.protect,viewsController.getAccount);
router.get('/profile',authController.isLoggedIn,authController.protect,viewsController.getProfile);
router.get('/payment',authController.isLoggedIn,authController.protect,viewsController.getPayment);


//router.get('/profile/password',authController.isLoggedIn,authController.protect,viewsController.getPassword);
// router.get('/newproperty',authController.isLoggedIn,authController.protect,authController.restrictTo('admin'),viewsController.newProperty);

module.exports = router;  


