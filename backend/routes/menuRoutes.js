const express = require('express');
const menuController = require('../controllers/menuController');

const router = express.Router();

//router.get('/list', restaurantController.getAllRestaurant);
 router.get('/list/:restaurantID', menuController.fetchAllmenus);
 router.get('/list/one/:id', menuController.fetchOneMenu);
 router.post('/addMenu', menuController.addMenu);
 router.delete('/deleteMenu/:id', menuController.deleteMenu);


//router.post('/login', restaurantController.login);
module.exports = router;