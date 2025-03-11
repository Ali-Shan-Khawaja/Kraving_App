const express = require('express');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

//router.get('/list', restaurantController.getAllRestaurant);
router.post('/verifiedNumbers', notificationController.fetchAllVerifiedNumbers);
router.post('/addNumber', notificationController.addPhoneNumber);
router.post('/verifyNumber', notificationController.verifyPhoneNumber);
router.post('/sendMessage', notificationController.sendMessage);




// router.get('/list/:id', restaurantController.fetchOneRestaurants);
// router.post('/addRestaurant', restaurantController.addRestaurant);
// router.delete('/deleteRestaurant/:id', restaurantController.deleteRestaurant);


//router.post('/login', restaurantController.login);
module.exports = router;