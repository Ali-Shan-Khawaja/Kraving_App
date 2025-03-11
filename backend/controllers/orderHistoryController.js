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

const fetchAllOrderHistory = (req,res) => {
    var params = {
        TableName: "orderHistory"
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("users::fetchOrderHistory::error - " + JSON.stringify(err, null, 2));
        }
        else {
            res.json(data.Items);
        }
    })
};

module.exports = {fetchAllOrderHistory}
