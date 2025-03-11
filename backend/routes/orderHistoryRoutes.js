const express = require('express');
const historyController = require('../controllers/orderHistoryController');

const router = express.Router();
 router.get('/', historyController.fetchAllOrderHistory);

module.exports = router;