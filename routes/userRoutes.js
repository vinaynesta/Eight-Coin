const express = require('express');
const userContoller = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const ledgerController = require('./../controllers/ledgerController');




const router = express.Router();

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.get('/logout',authController.logOut);

router.use(authController.protect);

// me route gives user its own details
router.get('/profile',userContoller.getMe,userContoller.getUser);
router.patch('/updatemypassword',authController.updatePassword);
router.patch('/updateme',userContoller.uploadUserPhoto,userContoller.resizeUserPhoto,userContoller.updateMe);
router.delete('/deleteme',userContoller.deleteMe);

router.post('/forgotpassword',authController.forgotPassword);
router.patch('/resetpassword/:token',authController.resetPassword);

router.use(authController.restrictTo('admin'));


router.patch("/updatecoins",authController.isLoggedIn,authController.protect,ledgerController.createTransaction,userContoller.updateCoins)


router.route('/')
.get(userContoller.getAllUsers)
.post(userContoller.createUsers)
.patch(userContoller.updateUser)
.delete(userContoller.deleteUser);

router.route('/:id')
.get(userContoller.getUser)
.post(userContoller.createUsers)
.patch(userContoller.updateUser)
.delete(userContoller.deleteUser);



module.exports = router;