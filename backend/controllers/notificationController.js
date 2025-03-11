const AWSSNS = require("aws-sdk");
const { Redshift } = require("aws-sdk");
const AWS = require("aws-sdk");
const config = require('../config.json');

const sns = new AWSSNS.SNS();
const lambda = new AWS.Lambda();

let awsConfig = {
    "region": config.awsSNSConfig.region,
    "accessKeyId": config.awsSNSConfig.accessKeyId, 
    "secretAccessKey": config.awsSNSConfig.secretAccessKey,
    "sessionToken": config.awsSNSConfig.sessionToken
};
AWSSNS.config.update(awsConfig);

const fetchAllVerifiedNumbers = (req,res) => {
  var PhoneNumber = '+1' +req.body.Number;
  console.log('Phone Number2: ' +PhoneNumber);
  var params = {
    FunctionName: 'fetchAllVerifiedNumbers',
    InvocationType: 'RequestResponse',
    LogType: 'None',
    Payload: ''
  };

lambda.invoke(params,function(err,data) {
  let numberMatach = false;
  if(err){
    res.send(err);
  }else{
    // console.log(JSON.parse(data.Payload));
    var phoneNumberList = JSON.parse(data.Payload);
   // res.json(JSON.parse(data.Payload));
   phoneNumberList.forEach(element => {
     if(element.PhoneNumber === PhoneNumber && element.Status==='Verified'){
        numberMatach = true;
     }

   });

   if(numberMatach) {
    res.json({
      "Message":"Sending Message directly",
      "Status" : true
    }) 
   } else {
    res.json({
      "Message":"Number not Verified",
      "Status" : false
    }) 
   }
   

  }
})

}

// const fetchAllVerifiedNumbers = (req,res) => {
//     var params = {
//         MaxResults: 10,
//         //NextToken: 'STRING_VALUE'
//       };
//       console.log(params);
//       console.log(sns);
//       sns.listSMSSandboxPhoneNumbers(params, function(err, data) {
//         if (err) {
//           console.log(err, err.stack);
//         }  // an error occurred
//         else   {
//           console.log(data);
//           res.json(data.PhoneNumbers);
//         }            // successful response
//       });
// };

const addPhoneNumber = (req,res) => {

  var params = {
    FunctionName: 'addPhoneNumber',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(req.body)
    //JSON.stringify(req.body.PhoneNumber)
    //'{ "PhoneNumber" : "7828822447" }' 
  };

  lambda.invoke(params,function(err,data) {
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })

};

// const addPhoneNumber = (req,res) => {
//   var params = {
//     PhoneNumber: req.body.PhoneNumber, /* required */
//     LanguageCode: 'en-US'
//   };
//   sns.createSMSSandboxPhoneNumber(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else    {
//       res.send("Verification Code Sent");
//       console.log(data); 
//     }           // successful response
//   });
// };

const verifyPhoneNumber = (req,res) => {

  var params = {
    FunctionName: 'verifyPhoneNumber',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(req.body)
  };

  lambda.invoke(params,function(err,data) {
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })
  // console.log(params);
};

// const verifyPhoneNumber = (req,res) => {
//   var params = {
//     PhoneNumber: req.body.PhoneNumber, /* required */
//     OneTimePassword: req.body.OneTimePassword
//   };
//   sns.verifySMSSandboxPhoneNumber(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else    {
//       res.send("Phone Number verified");
//       console.log(data); 
//     }           // successful response
//   });
// };
const sendMessage = (req,res) => {
  var params = {
    FunctionName: 'sendMessage',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(req.body)
  };

  lambda.invoke(params,function(err,data) {
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  })
  //console.log(params)
};

// const sendMessage = (req,res) => {
//   var params = {
//     Message: 'Test Message from Ali Shan AWS SNS Node App',
//     Subject: 'Testing',
//     PhoneNumber: '+17827740786'
//   };
//   sns.publish(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else    {
//       res.send("Message Sent");
//       console.log(data); 
//     }           // successful response
//   });
// };


module.exports = {fetchAllVerifiedNumbers,addPhoneNumber,verifyPhoneNumber,sendMessage}

