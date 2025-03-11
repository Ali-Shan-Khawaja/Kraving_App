const AWS = require("aws-sdk");
const { v4: uuidv4, v4 } = require('uuid');
const {fetchAllVerifiedNumbers}=require('../controllers/notificationController.js');
let docClient = new AWS.DynamoDB.DocumentClient();

const addOrder = (req, res) => {
   
    const orderBody = req.body;
    const orderItemsList = orderBody.orderedItems;
    const orderPriceList = [];
    const orderIdList = [];
    const orderItemsNameList = [];
    const orderIdDate = new Date().toISOString().slice(0, 10);
    const ordeIDTimeStamp = Date.now();
    const orderFinalObj = {};

    console.log(orderItemsList);
    for (let index = 0; index < orderItemsList.orders.length; index++) {
        // console.log(orderItemsList.orders[index]);
        orderPriceList.push(orderItemsList.orders[index].price);
        orderIdList.push(orderItemsList.orders[index].itemID);
        orderItemsNameList.push(orderItemsList.orders[index].itemName);
    }

    orderFinalObj.orderedItems = orderIdList;
    orderFinalObj.orderedItemsPrice = orderPriceList;
    orderFinalObj.orderedItemNames = orderItemsNameList;
    orderFinalObj.userId = orderBody.userId;
    orderFinalObj.orderID = uuidv4();
    orderFinalObj.orderDate = orderIdDate;
    orderFinalObj.totalQuantity = orderItemsList.totalqty;
    orderFinalObj.orderTotal = orderItemsList.totalPrice;
    orderFinalObj.ordeIDTimeStamp = ordeIDTimeStamp;

    console.log(orderFinalObj);

    var params = {
        TableName: "orderHistory",
        Item:  orderFinalObj
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("order::save::error - " + JSON.stringify(err, null, 2));  
            res.json({"Status":"Insertion Failed"});                     
        } else {
            console.log("order::save::success" );
            res.json({"Status":"Insertion Successful"});                      
        }
    });
}


module.exports =  {
   addOrder
};