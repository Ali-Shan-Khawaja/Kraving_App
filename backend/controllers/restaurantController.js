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

const fetchAllRestaurants = (req,res) => {
    var params = {
        TableName: "restaurants"
    };

    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
           // console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
           res.json(data.Items);
        }
    })
};

const fetchOneRestaurants = (req,res) => {
    var params = {
        TableName: "restaurants",
        Key: {
            "id": (req.params.id) 
        }
    };

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

const addRestaurant =  (req,res)=> {

    var input = {
        "id":  uuidv4(),
        "Address":  req.body.Address,
        "Cuisine": req.body.Cuisine,
        "ImageURL": req.body.ImageURL,
        "Description": req.body.Description,
         "Name": req.body.Name
      };
    var params = {
        TableName: "restaurants",
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


const deleteRestaurant = (req,res) => {

    var params = {
        TableName: "restaurants",
        Key: {
            "id": (req.params.id) 
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


const getAllRestaurant = (req,res)=>{
    res.json({
        msg:'mashawee'
    });
};

module.exports = {getAllRestaurant,fetchAllRestaurants,fetchOneRestaurants,addRestaurant,deleteRestaurant }
