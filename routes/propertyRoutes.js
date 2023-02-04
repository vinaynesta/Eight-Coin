const express = require('express');
const propertyController = require('./../controllers/propertyController');
const authController = require('./../controllers/authController');

const router = express.Router();



// router.param('id',propertyController.checkID);

router.route('/top-5-properties')
.get(propertyController.aliasTopProperties,propertyController.getAllProperties);

router.route('/properties-within/:distance/center/:latlng')
.get(propertyController.getPropertiesWithin);

// calculating distance of all property from a point
router.route('/distances/:latlng')
.get(propertyController.getDistances);

router.route('/:id')
.get(propertyController.showProperty)
.patch(authController.protect, authController.restrictTo('admin','manager'),propertyController.uploadpropertyImages,propertyController.resizepropertyImages,propertyController.updateProperty)
.delete(authController.protect, authController.restrictTo('admin','manager'),propertyController.delProperty);

router.route('/')
.get(propertyController.getAllProperties)
.post(authController.protect,authController.restrictTo('admin'),propertyController.createProperty);

router.route('/upload/images/:id')
.patch(authController.protect, authController.restrictTo('admin','manager'),propertyController.uploadpropertyImages,propertyController.resizepropertyImages,propertyController.insertImage)

module.exports = router;
