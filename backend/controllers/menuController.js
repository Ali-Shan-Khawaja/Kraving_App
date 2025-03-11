const AWS = require("aws-sdk");
const { v4: uuidv4, v4 } = require('uuid');
const config = require('../config.json');

let awsConfig = {
    "region": config.awsConfig.region,
    "endpoint": config.awsConfig.endpoint,
    "accessKeyId": config.awsConfig.accessKeyId, 
    "secretAccessKey": config.awsConfig.secretAccessKey,
    "sessionToken": config.awsConfig.sessionToken
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const fetchAllmenus = (req,res) => {
    var params = {
        TableName: "menu",
        
    };

    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
           // console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
           var filteredMenu=[];
           var allItems = data.Items;
           
           for (var i=0; i < allItems.length; i++) {
            //console.log(numbers[i])
                if(allItems[i].restaurantID === req.params.restaurantID){
                    filteredMenu.push(allItems[i]);
                }
            }

           res.json(filteredMenu);
        }
    })
};

const fetchOneMenu = (req,res) => {
    var params = {
        TableName: "menu",
        Key: {
            "itemID": (req.params.id) 
        }
    };

    console.log(params);

    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
          // console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));

           res.json(data.Item);
        }
    })
};

const addMenu =  (req,res)=> {

    var input = {
        "itemUnitPrice": req.body.itemUnitPrice,
        "itemPictureURL": req.body.itemPictureURL,
        "itemID": uuidv4(),
        "itemCuisine": req.body.itemCuisine,
        "itemName": req.body.itemName,
        "restaurantID": req.body.restaurantID
      };
    var params = {
        TableName: "menu",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));  
            res.json({"Status":"Insertion Failed"});                     
        } else {
            console.log("users::save::success" );
            res.json({"Status":"Insertion Successful"});                      
        }
    });
}


const deleteMenu = (req,res) => {

    var params = {
        TableName: "menu",
        Key: {
            "itemID": (req.params.id) 
        }
    };

    docClient.delete(params, function (err, data) {

        if (err) {
            console.log("users::delete::error - " + JSON.stringify(err, null, 2));
            res.json({"Status":"Deletion Failed"});
        } else {
            res.json({"Status":"Deletion Successful"}); 
        }
    });
}



module.exports = {fetchAllmenus,fetchOneMenu,addMenu,deleteMenu }
