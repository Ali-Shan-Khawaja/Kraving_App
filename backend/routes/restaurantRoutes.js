const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

//router.get('/list', restaurantController.getAllRestaurant);
router.get('/list', restaurantController.fetchAllRestaurants);
router.get('/list/:id', restaurantController.fetchOneRestaurants);
router.post('/addRestaurant', restaurantController.addRestaurant);
router.delete('/deleteRestaurant/:id', restaurantController.deleteRestaurant);


//router.post('/login', restaurantController.login);
module.exports = router;