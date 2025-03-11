const config = require('../config.json');
const AWS = require("aws-sdk");
const AmazonCognitoIdentityJs = require('amazon-cognito-identity-js');
const { v4: uuidv4, v4 } = require('uuid');
const { body, validationResult } = require('express-validator');

let awsConfig = {
    "region": config.awsConfig.region,
    "endpoint": config.awsConfig.endpoint,
    "accessKeyId": config.awsConfig.accessKeyId, 
    "secretAccessKey": config.awsConfig.secretAccessKey,
    "sessionToken": config.awsConfig.sessionToken
};

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const poolData = {
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.clientId
};

const userPool = new AmazonCognitoIdentityJs.CognitoUserPool(poolData);


const signup = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const gender = req.body.gender;
    const number = req.body.number;
    const address = req.body.address;
    const name = req.body.name;

    console.log(req.body);

    if(password != confirmPassword) {
        res.json({
            message: 'Confirm Password donot match'
        })
    }

    const emailData = {
        Name: 'email',
        Value: email
    };

    const emailAttributes = new AmazonCognitoIdentityJs.CognitoUserAttribute(emailData);

    userPool.signUp(email, password, [emailAttributes], null, (err, data) => {
        console.log(data);
        if(err) {
            console.log(err);
        }

        var input = {
            "id":  data.userSub,
            "Address":  address,
            "Email": email,
            "Gender": gender,
            "Number": number,
            "Name": name
        };
    
        var params = {
            TableName: "users",
            Item:  input
        };
        
        docClient.put(params, function (err, data) {

            if (err) {
                console.log("users::save::error - " + JSON.stringify(err, null, 2));                  
            } else {
                console.log("users::save::success" ); 
                res.json({
                    data,
                    msg: 'User Registered!'
                })             
            }
        });

        
    });

}

const login = (req, res) => {
    const data = {
        Username: req.body.email,
        Password: req.body.password
    }

    const authDetails = new AmazonCognitoIdentityJs.AuthenticationDetails(data);

    const userDetails = {
        Username: req.body.email,
        Pool: userPool
    }

    const cognitoUser = new AmazonCognitoIdentityJs.CognitoUser(userDetails);

    var isAdmin = false;
    if(data.Username === "al290543@dal.ca") {
        isAdmin = true;
    }

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: data => {
            res.json({
                data,
                success: true,
                isAdmin
            });
        },
        onFailure: err => {
            console.log(err);
            res.status(400).json({
                err,
                success: false
            });
        }
    })
}

const getUserById = (req, res) => {
    
    const userId = req.params.id;

    var params = {
        TableName: "users",
        Key: {
            "id": userId
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            // console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
        //   console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));

          console.log(data.Item);
          if(data.Item !== undefined) {
            res.json(data.Item);
          } else {
            res.status(404).json({
                msg: 'User not found'
            });
          }
           
        }
    })

    // res.json({
    //     msg: 'a'
    // });
}

module.exports =  {
    signup,
    login,
    getUserById
};